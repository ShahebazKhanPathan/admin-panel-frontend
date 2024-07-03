import { Button, Card, CardBody, CardHeader, Grid, GridItem, Input, Text } from "@chakra-ui/react"

const AdminSignIn = () => {
    return (
    <Grid templateColumns={"repeat(12, 1fr)"} marginTop={10} gap={4}>
        <GridItem colSpan={4}></GridItem>
        <GridItem colSpan={4}>
          <Card>
            <CardHeader textAlign={"center"}><Text fontSize={"xx-large"}>Admin login</Text></CardHeader>
            <CardBody textAlign={"center"}>
              <Input placeholder="Admin ID" id="fname" mb={4}/>
              <Input placeholder="Password" id="fname" mb={4} />
              <Button color="white" backgroundColor="black" mb={4}>Login</Button>
            </CardBody>
          </Card>
        </GridItem>  
        <GridItem colSpan={4}></GridItem>
      </Grid>        
    )
}

export default AdminSignIn;

