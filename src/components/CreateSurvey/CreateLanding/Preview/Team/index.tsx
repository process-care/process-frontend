import { Box, Text, Flex } from "@chakra-ui/react";
import React from "react";

export interface MemberList {
  members: any;
}

// const mock = {
//   members: [
//     { name: "Jean P.", job: "Chercheur universitaire" },
//     { name: "Jean C.", job: "Chercheur universitaire" },
//     { name: "Jean F.", job: "Chercheur universitaire" },
//     { name: "Jean Z.", job: "Chercheur universitaire" },
//   ],
// };

const Member: React.FC<MemberList["members"]> = (member) => {
  console.log(member.member);
  return (
    <Flex>
      plaf
      {/* <img src={member.member[3].base64} alt="" />
      <Text variant="currentLight" textTransform="uppercase" mt={7}>
        {member.member[1]}
      </Text>
      <Text variant="xsRegular" mt={2}>
        {member.member[2]}
      </Text> */}
    </Flex>
  );
};

export const Team: React.FC<MemberList> = ({ members }) => {
  return (
    <Box>
      <Text variant="xl">L'équipe</Text>
      <Flex w="80%" marginX="auto" justify="space-around" mt={20}>
        <p>ppal</p>
        {Object.entries(members).map((member: any, i: number) => (
          <Member key={i} member={member} i={i} />
        ))}
      </Flex>
    </Box>
  );
};
