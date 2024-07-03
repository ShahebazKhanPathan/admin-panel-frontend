import { Button, Grid, GridItem, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import apiClient from "../services/api-client";
import { useEffect, useState } from "react";

const Navbar = () => {

    const token = localStorage.getItem('admin-auth-token');
    const [isToken, setToken] = useState(false);

    const logOut = async () => {
        await apiClient.delete("/api/blacklist",
            { headers: { "admin-auth-token": localStorage.getItem('admin-auth-token') } })
            .then(() => {
                localStorage.removeItem("admin-auth-token");
                setToken(false);
                window.location.href = "/";
            })
            .catch((err) => console.log(err));
    };
    
    const checkTokenExpiry = async () => {
        if (token) {
            await apiClient.get("/api/blacklist", { headers: { "auth-token": localStorage.getItem('auth-token') } })
                .then(({ data }) => {
                    setToken(true);
                })
                .catch(() => setToken(false));
        }
    };

    useEffect(() => {
        checkTokenExpiry();
    });

    return (
        <Grid templateColumns={"repeat(11, 1fr)"} padding={5} alignItems={"center"}>
            <GridItem colSpan={8}>
            <Text fontSize={"xx-large"}>Admin Panel</Text>
            </GridItem>
            <GridItem colSpan={1} fontSize={"large"}>
            <Link to={"/"}>User</Link>
            </GridItem>
            <GridItem colSpan={1} fontSize={"large"}>
            <Link to={"/admin"}>Admin</Link>
            </GridItem>
            {token &&
                <GridItem colSpan={1} fontSize={"large"}>
                    <Button variant={"ghost"} onClick={() => logOut()}>Logout</Button>
                </GridItem>
            }
        </Grid>
    )
}

export default Navbar;