import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Card, CardBody, CardHeader, Grid, GridItem, Input, Text } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import apiClient from "../services/api-client"
import { useState } from "react"

interface User{
    firstname: string,
    lastname: string,
    email: string,
    password: string
}

const SignUp = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<User>();
    const [error, setError] = useState('');

    const onSubmit = (data: User) => {
        setError("");
        apiClient.post("/api/user", data)
            .then(({ data }) => {
                localStorage.setItem("auth-token", data);               
                location.href = "/";
            })
            .catch(({ response }) => {
                setError(response.data);
            });
    }

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
                <Card>
                    <CardHeader textAlign={"center"}><Text fontSize={"xx-large"}>Sign Up</Text></CardHeader>
                    <CardBody>
                        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                            <Input {...register("firstname", { required: "First name is required", minLength: { value: 4, message: "First name must be atleast 4 characters long." } })} placeholder="First name" id="firstname" />
                            {errors.firstname && <Text color={"red"}>{errors.firstname.message}</Text>}
                            <Input {...register("lastname", { required: "Last name is required", minLength: { value: 4, message: "Last name must be atleast 4 characters long." } })} placeholder="Last name" id="lastname" mt={4} />
                            {errors.lastname && <Text color={"red"}>{errors.lastname.message}</Text>}
                            <Input {...register("email", { required: "Email is required", minLength: { value: 5, message: "Email must be atleast 5 characters long." } })} placeholder="Email" id="email" mt={4} />
                            {errors.email && <Text color={"red"}>{errors.email.message}</Text>}
                            <Input type="password" {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must be atleast 8 characters long." } })} placeholder="Password" id="password" mt={4} />
                            {errors.password && <Text color={"red"}>{errors.password.message}</Text>}
                            <Button color="white" type="submit" backgroundColor="black" mt={4}>Register</Button>
                            <Text fontSize={"large"} mt={3}>Already user? <Link to={"/"}>Login here</Link></Text>
                        </form>
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem colSpan={4}></GridItem>
        </Grid>
    );
}

export default SignUp;

