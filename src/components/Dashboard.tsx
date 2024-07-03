import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Card, CardBody, CardHeader, Grid, GridItem, Input, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { useForm } from "react-hook-form";
import apiClient from "../services/api-client";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface User{
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

const Dashboard = () => {

    const token = localStorage.getItem("admin-auth-token");
    if (!token) return <Navigate to={"/"} />;

    const { register, handleSubmit, formState: { errors }, reset } = useForm<User>();
    const [error, setError] = useState('');
    const [alert, setAlert] = useState(false);
    const [loader, setLoader] = useState(false);
    const [users, setUsers] = useState<User[]>([]);

    const getUsers = () => {
        apiClient.get("/api/user")
            .then((res) => setUsers(res.data))
            .catch((err) => setError(err.message));
    }

    const removeUser = (id: String) => {
        setLoader(true);
        setAlert(false);
        setError("");
        apiClient.delete("/api/product/" + id)
            .then(() => {
                setLoader(false);
                getUsers();
                reset({ firstName: "", lastName: "", email: "", password: ""});
            })
            .catch((err) => {
                setLoader(false);
                setError(err.message)
            });
    }

    useEffect(() => {
        getUsers();
    }, []);

    const onSubmit = (data: User) => {
        setError("");
        setAlert(false);
        apiClient.post("/api/user", data)
            .then(({ data }) => {
                setAlert(true);
                getUsers();
            })
            .catch(({ response }) => {
                setError(response.data);
            });
    }

    return (
        <Grid templateColumns={"repeat(14, 1fr)"} marginTop={10} gap={6}>
            <GridItem colSpan={1}></GridItem>
            <GridItem colSpan={4}>
                {error &&
                    <Alert status='error'>
                        <AlertIcon />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                }
                {alert &&
                    <Alert status='success'>
                        <AlertIcon />
                        <AlertTitle>Success!</AlertTitle>
                        <AlertDescription>New user added!</AlertDescription>
                    </Alert>
                }
                <Card>
                    <CardHeader textAlign={"center"}><Text fontSize={"xx-large"}>Add new user</Text></CardHeader>
                    <CardBody>
                        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                            <Input {...register("firstName", { required: "First name is required", minLength: { value: 4, message: "First name must be atleast 4 characters long." } })} placeholder="First name" id="firstname" />
                            {errors.firstName && <Text color={"red"}>{errors.firstName.message}</Text>}
                            <Input {...register("lastName", { required: "Last name is required", minLength: { value: 4, message: "Last name must be atleast 4 characters long." } })} placeholder="Last name" id="lastname" mt={4} />
                            {errors.lastName && <Text color={"red"}>{errors.lastName.message}</Text>}
                            <Input {...register("email", { required: "Email is required", minLength: { value: 5, message: "Email must be atleast 5 characters long." } })} placeholder="Email" id="email" mt={4} />
                            {errors.email && <Text color={"red"}>{errors.email.message}</Text>}
                            <Input type="password" {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must be atleast 8 characters long." } })} placeholder="Password" id="password" mt={4} />
                            {errors.password && <Text color={"red"}>{errors.password.message}</Text>}
                            <Button color="white" type="submit" backgroundColor="black" mt={4}>Register</Button>
                        </form>
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem colSpan={8}>
                <Card>
                    <CardHeader><Text fontSize={"xx-large"}>Users</Text></CardHeader>
                    <CardBody>
                    {users.length > 0 ?
                        <TableContainer>
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>First name</Th>
                                        <Th>Last name</Th>
                                        <Th>Email</Th>
                                        <Th>Action</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {users.map((user) =>
                                        <Tr key={user._id}>
                                            <Td>{user.firstName}</Td>
                                            <Td>{user.lastName}</Td>
                                            <Td>{user.email}</Td>
                                            <Td><Button onClick={() => removeUser(user._id)} colorScheme="red" size="sm">Remove</Button></Td>
                                        </Tr>
                                    )}
                                </Tbody>
                            </Table>
                        </TableContainer>
                        :
                        <Text>No products added yet.</Text>
                    }
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem colSpan={1}></GridItem>
        </Grid>
    );
}

export default Dashboard;