import { Button, Card, CardBody, CardHeader, Grid, GridItem, Input, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

const SignUp = () => {
    return (
    <Grid templateColumns={"repeat(12, 1fr)"} marginTop={10} gap={4}>
        <GridItem colSpan={4}></GridItem>
        <GridItem colSpan={4}>
          <Card>
            <CardHeader textAlign={"center"}><Text fontSize={"xx-large"}>Sign Up</Text></CardHeader>
            <CardBody textAlign={"center"}>
                <Input placeholder="First name" id="fname" mb={4}/>
                <Input placeholder="Last name" id="fname" mb={4} /> 
                <Input placeholder="Email" id="fname" mb={4}/>
                <Input placeholder="Password" id="fname" mb={4} />
                <Button color="white" backgroundColor="black" mb={4}>Register</Button>
                <Text fontSize={"large"}>Already user? <Link to={"/"}>Login here</Link></Text>
            </CardBody>
          </Card>
        </GridItem>  
        <GridItem colSpan={4}></GridItem>
      </Grid>        
    )
}

export default SignUp;

