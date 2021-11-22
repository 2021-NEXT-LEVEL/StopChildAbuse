import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Axios from "@api/index";
import styles from "@login/Login.module.css";
import { ChakraProvider } from "@chakra-ui/react";
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
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

function Login() {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();

    let variables = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    Axios.post("login/", variables).then((res) => {
      console.log(res);
      if (res.status === 200) {
        if (res.data.message === "incorrect") {
          window.alert("아이디/비밀번호를 다시 확인하세요.");
        } else {
          localStorage.setItem("id", res.data.data.user_id);
          localStorage.setItem("name", res.data.data.name);
          if (res.data.data.name === "관리자") {
            console.log(localStorage);
            window.location.replace("/master/main");
          } else {
            console.log(localStorage);
            window.location.replace("/user/main");
          }
        }
      }
    });
  };

  useEffect(() => {
    localStorage.clear();
    console.log(localStorage);
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
            <Heading color="teal.400">Welcome</Heading>
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
                        children={<CFaUserAlt color="gray.300" />}
                      />
                      <Input
                        type="email"
                        name="email"
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
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="비밀번호"
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <Button
                    borderRadius={0}
                    variant="solid"
                    colorScheme="teal"
                    width="full"
                    type="submit"
                  >
                    Sign in
                  </Button>
                </Stack>
              </form>
            </Box>
          </Stack>
          <Box style={{ fontSize: "1.2em" }}>
            New to us?{" "}
            <Link color="teal.500" href="/register">
              Sign up
            </Link>
          </Box>
        </Flex>
      </div>
    </ChakraProvider>
  );
}

export default Login;
