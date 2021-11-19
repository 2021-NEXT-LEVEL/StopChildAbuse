import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import styles from "@register/Register.module.css";
import { ChakraProvider } from "@chakra-ui/react";
import { message, Space } from "antd";
import Axios from "@api/index";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { PhoneIcon, AtSignIcon, StarIcon } from "@chakra-ui/icons";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const handleShowClick = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 비밀번호 및 비밀번호 확인 일치 체크
    if (e.target.password.value !== e.target.password_check.value) {
      window.alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    let variables = {
      email: e.target.email.value,
      password: e.target.password.value,
      name: e.target.name.value,
      phone: e.target.phone.value,
      child_name: e.target.child_name.value,
    };

    Axios.post("register/", variables)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log("register success");
          history.push("/");
        } else {
          alert("register failed");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    localStorage.clear();
    // console.log(localStorage);
  }, []);

  return (
    <ChakraProvider>
      <div>
        <Flex
          flexDirection="column"
          width="100wh"
          height="80vh"
          backgroundColor="gray.200"
          justifyContent="center"
          alignItems="center"
        >
          <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
          >
            <Avatar bg="teal.500" />
            <Heading color="teal.400">Sign Up</Heading>
            <Box minW={{ base: "90%", md: "468px" }}>
              <form onSubmit={handleSubmit}>
                <Stack
                  spacing={4}
                  p="1rem"
                  backgroundColor="whiteAlpha.900"
                  boxShadow="md"
                >
                  <FormControl isRequired>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<AtSignIcon color="gray.300" />}
                      />
                      <Input
                        name="email"
                        type="email"
                        placeholder="이메일 주소"
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl isRequired>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        children={<CFaLock color="gray.300" />}
                      />
                      <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="비밀번호"
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <FormControl isRequired>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        children={<CFaLock color="gray.300" />}
                      />
                      <Input
                        name="password_check"
                        type={showPassword ? "text" : "password"}
                        placeholder="비밀번호 확인"
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <FormControl isRequired>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<CFaUserAlt color="gray.300" />}
                      />
                      <Input name="name" type="text" placeholder="이름" />
                    </InputGroup>
                  </FormControl>
                  <FormControl isRequired>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<PhoneIcon color="gray.300" />}
                      />
                      <Input name="phone" type="tel" placeholder="휴대폰번호" />
                    </InputGroup>
                  </FormControl>
                  <FormControl isRequired>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<StarIcon color="gray.300" />}
                      />
                      <Input
                        name="child_name"
                        type="text"
                        placeholder="자녀 이름"
                      />
                    </InputGroup>
                  </FormControl>
                  <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="teal"
                    width="full"
                  >
                    Sign up
                  </Button>
                </Stack>
              </form>
            </Box>
          </Stack>
          <Box style={{ fontSize: "1.2em" }}>
            Already Registered?{" "}
            <Link color="teal.500" href="/">
              Sign in
            </Link>
          </Box>
        </Flex>
      </div>
    </ChakraProvider>
  );
}

export default Register;
