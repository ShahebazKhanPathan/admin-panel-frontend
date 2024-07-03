import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Card, CardBody, CardHeader, Grid, GridItem, Input, Text } from "@chakra-ui/react"
import { useForm } from "react-hook-form";
import apiClient from "../services/api-client";
import { useState } from "react";
import { Navigate } from "react-router-dom";

interface Admin{
  id: string;
  password: string
}

const AdminSignIn = () => {

  const token = localStorage.getItem("admin-auth-token");
  const { register, handleSubmit, formState: { errors } } = useForm<Admin>();
  const [error, setError] = useState('');

  const onSubmit = (data: Admin) => {
    setError("");
    apiClient.post("/api/admin", data)
      .then(({ data }) => {
        localStorage.setItem("admin-auth-token", data);
      })
      .catch(({ response }) => {
        setError(response.data);
      });
  };

  if (!token) {
    return (
      <Grid templateColumns={"repeat(12, 1fr)"} marginTop={10} gap={4}>
        <GridItem colSpan={4}></GridItem>
        <GridItem colSpan={4}>
          {error &&
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          }
          <Card>
            <CardHeader textAlign={"center"}><Text fontSize={"xx-large"}>Admin login</Text></CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                <Input {...register("id", { required: "ID is required." })} placeholder="Admin ID" id="id" mt={4} />
                {errors.id && <Text color={"red"}>{errors.id.message}</Text>}
                <Input type="password" {...register("password", { required: "Password is required." })} placeholder="Password" id="password" mt={4} />
                {errors.password && <Text color={"red"}>{errors.password.message}</Text>}
                <Button type="submit" color="white" backgroundColor="black" mt={4}>Login</Button>
              </form>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem colSpan={4}></GridItem>
      </Grid>
    );
  }
  else {
    return <Navigate to={"/dashboard"} />
  }
}

export default AdminSignIn;

