import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Card, CardBody, CardHeader, Grid, GridItem, Input, Text } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import apiClient from "../services/api-client"
import { useState } from "react"

interface User{
  email: string,
  password: string
}

const SignIn = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<User>();
  const [error, setError] = useState('');
  const [alert, setAlert] = useState(false);

  const onSubmit = (data: User) => {
    setError("");
    setAlert(false);
    apiClient.post("/api/auth", data)
      .then(({ data }) => {
        setAlert(true);
        localStorage.setItem("auth-token", data);
      })
      .catch(({ response }) => {
        setError(response.data);
      });
  };


  return (
    <Grid templateColumns={"repeat(12, 1fr)"} marginTop={10} gap={4}>
      <GridItem colSpan={4}></GridItem>
      <GridItem colSpan={4}>
        { error &&
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>                    
        }
        {alert &&
          <Alert status='success'>
            <AlertIcon />
            You are logged in successfully!
          </Alert>
        }
        <Card>
          <CardHeader textAlign={"center"}><Text fontSize={"xx-large"}>Sign In</Text></CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
              <Input {...register("email", { required: "Email is required", minLength: { value: 5, message: "Email must be atleast 5 characters long."}})} placeholder="Email" id="email" />
              {errors.email && <Text color={"red"}>{ errors.email.message }</Text>}
              <Input type="password" {...register("password", { required: "Password is required.", minLength: { value: 6, message: "Password must be atleast 6 characters long."}})} placeholder="Password" id="password" mt={4} />
              {errors.password && <Text color={"red"}>{ errors.password.message }</Text>}
              <Button color="white" type="submit" backgroundColor="black" mt={4}>Login</Button>
              <Text fontSize={"large"} mt={3}>New user? <Link to={"/sign-up"}>Create new account</Link></Text>
            </form>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem colSpan={4}></GridItem>
    </Grid>
  );
}

export default SignIn;

