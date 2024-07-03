import { Button, Card, CardBody, CardHeader, Grid, GridItem, Input, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

const SignIn = () => {
    return (
    <Grid templateColumns={"repeat(12, 1fr)"} marginTop={10} gap={4}>
        <GridItem colSpan={4}></GridItem>
        <GridItem colSpan={4}>
          <Card>
            <CardHeader textAlign={"center"}><Text fontSize={"xx-large"}>Sign In</Text></CardHeader>
            <CardBody textAlign={"center"}>
              <Input placeholder="Email" id="fname" mb={4}/>
              <Input placeholder="Password" id="fname" mb={4} />
              <Button color="white" backgroundColor="black" mb={4}>Login</Button>
              <Text fontSize={"x-large"}><Link to={"/sign-up"}>Create new account</Link></Text>
            </CardBody>
          </Card>
        </GridItem>  
        <GridItem colSpan={4}></GridItem>
      </Grid>        
    )
}

export default SignIn;

