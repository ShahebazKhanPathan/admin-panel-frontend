import { Grid, GridItem, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <Grid templateColumns={"repeat(10, 1fr)"} padding={5} alignItems={"center"}>
            <GridItem colSpan={8}>
            <Text fontSize={"xx-large"}>Admin Panel</Text>
            </GridItem>
            <GridItem colSpan={1} fontSize={"large"}>
            <Link to={"/"}>User</Link>
            </GridItem>
            <GridItem colSpan={1} fontSize={"large"}>
            <Link to={"/admin"}>Admin</Link>
            </GridItem>
        </Grid>
    )
}

export default Navbar;