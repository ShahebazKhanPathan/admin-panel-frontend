import { Button, Card, CardBody, CardHeader, Grid, GridItem, Input, Text } from "@chakra-ui/react"
import { useForm } from "react-hook-form";

interface Admin{
  id: string;
  password: string
}

const AdminSignIn = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<Admin>();

  return (
    <Grid templateColumns={"repeat(12, 1fr)"} marginTop={10} gap={4}>
      <GridItem colSpan={4}></GridItem>
      <GridItem colSpan={4}>
        <Card>
          <CardHeader textAlign={"center"}><Text fontSize={"xx-large"}>Admin login</Text></CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit((data) => console.log(data))}>
              <Input {...register("id", { required: "ID is required."})} placeholder="Admin ID" id="fname" mt={4} />
              {errors.id && <Text color={"red"}>{ errors.id.message }</Text>}
              <Input {...register("password", { required: "Password is required."})} placeholder="Password" id="fname" mt={4} />
              {errors.password && <Text color={"red"}>{ errors.password.message }</Text>}
              <Button type="submit" color="white" backgroundColor="black" mt={4}>Login</Button>
            </form>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem colSpan={4}></GridItem>
    </Grid>
  );
}

export default AdminSignIn;

