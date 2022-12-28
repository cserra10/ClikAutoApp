import React, { useState } from 'react';
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
  WarningOutlineIcon,
  IconButton,
  Icon,
  Spinner,
  Modal
} from 'native-base';
import auth from '@react-native-firebase/auth';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import IconGoogle from 'src/icons/IconGoogle';
import IconFacebook from 'src/icons/IconFacebook';
import { useMutation } from 'react-query';
import Feather from 'react-native-vector-icons/Feather';

const schema = yup.object({
  email: yup.string().email('Enter a valid email').required('Required'),
  password: yup.string().required('Required'),
}).required();

export function SignInForm({ props }) {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const loginMutation = useMutation(({ email, password }) => auth().signInWithEmailAndPassword(email, password));
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  }

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
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl isRequired isInvalid={!!fieldState.error}>
                    <FormControl.Label>Email</FormControl.Label>
                    <Input
                      placeholder="email"
                      value={field.value}
                      onChangeText={field.onChange}
                      height={9}
                    />
                    {!!fieldState.error && (
                      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        {fieldState.error.message}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl isRequired isInvalid={!!fieldState.error}>
                    <FormControl.Label>Password</FormControl.Label>
                    <Input
                      placeholder="Password"
                      type={showPassword ? '' : 'password'}
                      value={field.value}
                      onChangeText={field.onChange}
                      height={9}
                      InputRightElement={
                        <IconButton
                          icon={
                            <Icon
                              size="4"
                              color="coolGray.400"
                              as={Feather}
                              name={showPassword ? 'eye-off' : 'eye'}
                            />
                          }
                          onPress={toggleShowPassword}
                        />
                      }
                    />
                    {!!fieldState.error && (
                      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        {fieldState.error.message}
                      </FormControl.ErrorMessage>
                    )}
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
                disabled={loginMutation.isLoading}
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

        <Modal isOpen={loginMutation.isLoading}>
          <Spinner />
        </Modal>

        <Modal isOpen={loginMutation.isError}>
          <Modal.Content>
            <Modal.Header>Error</Modal.Header>
            <Modal.Body>
              <Text>{loginMutation?.error?.message}</Text>
            </Modal.Body>
            <Modal.Footer>
              <Button flex="1" onPress={loginMutation.reset}>
                Ok
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
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
          flex="1"
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
