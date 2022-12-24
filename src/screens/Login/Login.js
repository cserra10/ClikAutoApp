import React, { useEffect, useState } from 'react';
import {
  Button,
  HStack,
  VStack,
  Text,
  Link,
  Checkbox,
  Divider,
  Pressable,
  Center,
  Hidden,
  StatusBar,
  Stack,
  Box,
  Input,
  FormControl,
  WarningOutlineIcon
} from 'native-base';
import auth from '@react-native-firebase/auth';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import IconGoogle from 'src/icons/IconGoogle';
import IconFacebook from 'src/icons/IconFacebook';
import { useMutation } from 'react-query';


const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
}).required();

export function SignInForm({ props }) {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const loginMutation = useMutation(({ username, password }) => auth().signInWithEmailAndPassword(username, password));
  // const [showPassword, setShowPassword] = React.useState(false);

  // const onSubmit = data => console.log(data);

  useEffect(() => {
    console.log(loginMutation);
  }, [loginMutation.data]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      style={{
        flex: 1,
      }}
    >
      <VStack
        flex="1"
        p="8"
        _light={{
          bg: 'white',
        }}
        _dark={{
          bg: 'coolGray.800',
        }}
        space="4"
        justifyContent="space-between"
        borderTopRightRadius={{
          base: '2xl',
          md: 'xl',
        }}
        borderBottomRightRadius={{
          base: '0',
          md: 'xl',
        }}
        borderTopLeftRadius={{
          base: '2xl',
          md: '0',
        }}
      >
        <VStack space="4">
          <Hidden till="md">
            <Text fontSize="lg" fontWeight="normal">
              Sign in to continue!
            </Text>
          </Hidden>

          <VStack space="4">
            <VStack space="4">
              <Controller
                name="username"
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl isRequired width="100%">
                    <Stack>
                      <FormControl.Label>Username</FormControl.Label>
                      <Input
                        placeholder="Username"
                        value={field.value}
                        onChangeText={field.onChange}
                      />
                      {!!fieldState.error && (
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                          {fieldState.error.message}
                        </FormControl.ErrorMessage>
                      )}
                    </Stack>
                  </FormControl>
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl isRequired>
                    <Stack>
                      <FormControl.Label>Password</FormControl.Label>
                      <Input
                        placeholder="Password"
                        type="password"
                        value={field.value}
                        onChangeText={field.onChange}
                      />
                      {!!fieldState.error && (
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                          {fieldState.error.message}
                        </FormControl.ErrorMessage>
                      )}
                    </Stack>
                  </FormControl>
                )}
              />

              <Link
                href="https://google.com"
                ml="auto"
                _text={{
                  fontSize: 'xs',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                }}
                _light={{
                  _text: {
                    color: 'primary.900',
                  },
                }}
                _dark={{
                  _text: {
                    color: 'primary.500',
                  },
                }}
              >
                Forgot password?
              </Link>

              <Checkbox
                alignItems="flex-start"
                isChecked
                value="demo"
                colorScheme="primary"
                accessibilityLabel="Remember me"
              >
                <Text
                  pl="3"
                  fontWeight="normal"
                  _light={{
                    color: 'coolGray.800',
                  }}
                  _dark={{
                    color: 'coolGray.400',
                  }}
                >
                  Remember me and keep me logged in
                </Text>
              </Checkbox>

              <Button
                size="md"
                borderRadius="4"
                _text={{
                  fontWeight: 'medium',
                }}
                _light={{
                  bg: 'primary.900',
                }}
                _dark={{
                  bg: 'primary.700',
                }}
                onPress={handleSubmit(loginMutation.mutate)}
              >
                SIGN IN
              </Button>

              <HStack
                space="4"
                alignItems="center"
                justifyContent="center"
              >
                <Divider
                  w="30%"
                  _light={{
                    bg: 'coolGray.200',
                  }}
                  _dark={{
                    bg: 'coolGray.700',
                  }}
                />
                <Text
                  fontWeight="medium"
                  _light={{
                    color: 'coolGray.300',
                  }}
                  _dark={{
                    color: 'coolGray.500',
                  }}
                >
                  or
                </Text>
                <Divider
                  w="30%"
                  _light={{
                    bg: 'coolGray.200',
                  }}
                  _dark={{
                    bg: 'coolGray.700',
                  }}
                />
              </HStack>
            </VStack>

            <Center>
              <HStack space="4">
                <Pressable>
                  <IconFacebook />
                </Pressable>
                <Pressable>
                  <IconGoogle />
                </Pressable>
              </HStack>
            </Center>
          </VStack>
        </VStack>

        <HStack
          space="1"
          safeAreaBottom
          alignItems="center"
          justifyContent="center"
          mt={{
            base: 'auto',
            md: '8',
          }}
        >
          <Text
            _light={{
              color: 'coolGray.800',
            }}
            _dark={{
              color: 'coolGray.400',
            }}
          >
            Don't have an account?
          </Text>

          <Link
            href="https://google.com"
            _text={{
              fontWeight: 'bold',
              textDecoration: 'none',
            }}
            _light={{
              _text: {
                color: 'primary.900',
              },
            }}
            _dark={{
              _text: {
                color: 'primary.500',
              },
            }}
            onPress={() => {
              props.navigation.navigate('SignUp');
            }}
          >
            Sign up
          </Link>
        </HStack>
      </VStack>
    </KeyboardAwareScrollView>
  );
}

export default function SignIn(props) {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <Box
        safeAreaTop
        _light={{
          bg: 'primary.900',
        }}
        _dark={{
          bg: 'coolGray.900',
        }}
      />

      <Center
        _dark={{
          bg: 'coolGray.900',
        }}
        _light={{
          bg: 'primary.900',
        }}
        flex="1"
      >
        <Stack
          flexDirection={{
            base: 'column',
            md: 'row',
          }}
          w="100%"
          maxW={{
            md: '1016px',
          }}
          flex={{
            base: '1',
            md: '1',
          }}
          space="8"
        >
          <Hidden from="md">
            <VStack px="8" space="8">
              <Text color="coolGray.50" fontSize="lg">
                Sign In
              </Text>
              <VStack>
                <Text fontSize="3xl" fontWeight="bold" color="coolGray.50">
                  Welcome back,
                </Text>
                <Text
                  fontSize="md"
                  fontWeight="normal"
                  _dark={{
                    color: 'coolGray.400',
                  }}
                  _light={{
                    color: 'primary.300',
                  }}
                >
                  Sign in to continue
                </Text>
              </VStack>
            </VStack>
          </Hidden>

          <SignInForm props={props} />
        </Stack>
      </Center>
    </>
  );
}
