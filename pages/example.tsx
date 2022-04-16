import React, { useEffect, useState } from "react";

import { auth, database } from "@/firebase";
import { Box } from "@chakra-ui/react";
import { faker } from "@faker-js/faker";

const ExamplePage = () => {
  const [email, setEmail] = useState(faker.internet.email());
  const [password, setPassword] = useState(faker.internet.password());

  async function getData() {
    // const response = await auth.signInWithEmailAndPassword("Lafayette54@yahoo.com", "9VaS6q3zZxLAlwc");
    // Lafayette54@yahoo.com 9VaS6q3zZxLAlwc
    /*  const response = await auth.createUserWithEmailAndPassword(email, password); */

    // Check if user is auth
    const user = auth.currentUser;

    console.log(user?.toJSON());

    // Logout
    // auth.signOut();
  }

  useEffect(() => {
    getData();
  }, []);

  return <Box m="24">ExamplePage</Box>;
};

export default ExamplePage;
