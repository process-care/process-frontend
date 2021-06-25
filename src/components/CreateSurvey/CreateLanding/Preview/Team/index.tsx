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

// const Member: React.FC<MemberList["members"]> = (member, i) => {
//   return (
//     <Box>
//       <Circle size="xl" name="Dan Abrahmov" />
//       <Text variant="currentLight" textTransform="uppercase" mt={7}>
//         {member.name}
//       </Text>
//       <Text variant="xsRegular" mt={2}>
//         {member.job}
//       </Text>
//     </Box>
//   );
// };

export const Team: React.FC<MemberList> = ({ members }) => {
  // const format = () => {
  //   for (const [key, value] of Object.entries(members)) {
  //     const regex = /\d+/g;
  //     const group = key.match(regex);
  //     if (group) {
  //       return {
  //         [group[0]]: {
  //           [key]: value,
  //         },
  //       };
  //     }
  //   }
  // };

  console.log(Object.entries(members).map((em) => em[0]));

  return (
    <Box>
      <Text variant="xl">L'équipe</Text>
      <Flex w="80%" marginX="auto" justify="space-around" mt={20}>
        <p>ppal</p>
        {/* {members.map((member,i) => (
          <Member key={name} member={member} i={i} />
        ))} */}
      </Flex>
    </Box>
  );
};
