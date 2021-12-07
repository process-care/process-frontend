// import React, { useEffect } from "react";
// import { Box, FormLabel, Text } from "@chakra-ui/react";
// import IQuestion from "types/form/question";
// import { v4 as uuidv4 } from "uuid";
// interface Props {
//   label: string;
//   helpText?: string;
//   name: string;
//   isCollapsed?: boolean;
//   factors: IQuestion["factors"];
// }

// export const AssociatedClassification: React.FC<Props> = ({
//   label,
//   helpText,
//   isCollapsed,
//   factors,
// }) => {
//   const Card = ({ factors }: { factors: IQuestion["factors"] }) => {
//     const filteredFactors = factors?.filter((f) => f !== null);
//     const [state, setState] = React.useState({ r: 0, isMounted: false });
//     if (filteredFactors === undefined) {
//       return <></>;
//     }

//     return (
//       <Box
//         border="1px solid #E5E5E5"
//         borderRadius="5px"
//         mt="30px"
//         w="40%"
//         _hover={{ border: "1px solid black" }}
//       >
//         {filteredFactors.map((factor, i) => {
//           if (!factor?.modalities) {
//             return <></>;
//           }
//           const rr = filteredFactors.map(
//             (f) => f.modalities && f.modalities.length
//           );
//           const random = Math.floor(Math.random() * rr[i]);

//           useEffect(() => {
//             setState({ r: random, isMounted: true });
//           }, [random]);

//           if (!state.isMounted) {
//             return <>Loading</>;
//           }

//           return (
//             <Box key={uuidv4()}>
//               <Text variant="currentBold" textTransform="uppercase" mt="10px">
//                 {factor?.title}
//               </Text>
//               <Box borderBottom="1px solid #E5E5E5" py="10px" pl="10px">
//                 <Box key={factor?.modalities[random]?.description}>
//                   {factor?.modalities[random]?.file && (
//                     <img
//                       src={factor?.modalities[random]?.file}
//                       alt={factor?.modalities[random]?.description}
//                       style={{ maxWidth: "30px", margin: "0 auto" }}
//                     />
//                   )}
//                   <Text variant="currentLight" textAlign="left">
//                     {/* {factor?.modalities[r]?.description} */}
//                     {state.r}
//                   </Text>
//                 </Box>
//               </Box>
//             </Box>
//           );
//         })}
//       </Box>
//     );
//   };

//   return (
//     <Box>
//       <FormLabel>{label}</FormLabel>
//       {!isCollapsed && (
//         <>
//           <Box d="flex" justifyContent="space-around" w="100%">
//             <Card factors={factors} />
//           </Box>
//           <Text fontSize="xs">{helpText}</Text>
//         </>
//       )}
//     </Box>
//   );
// };

import React, { useState, useEffect } from "react";
import { Box, Button, FormLabel, Text } from "@chakra-ui/react";
import IQuestion from "types/form/question";
import { v4 as uuidv4 } from "uuid";

interface Props {
  label: string;
  helpText?: string;
  name: string;
  isCollapsed?: boolean;
  factors: IQuestion["factors"];
}

export const AssociatedClassification: React.FC<Props> = ({
  label,
  helpText,
  isCollapsed,
  factors,
}) => {
  const [state, setState] = useState<any[]>([0, 0, 0]);

  const _f = factors?.filter((f) => f !== null);
  const _m = _f?.map((f) => f.modalities?.length);

  const generate = () => {
    const variation = _m?.map((m) => Math.floor(Math.random() * m));

    if (variation) {
      if (
        state.length > 0 &&
        state.every((arr) => JSON.stringify(arr) === JSON.stringify(variation))
      ) {
        console.log("END OF POSSIBILTIES", state);
        return false;
      } else if (
        state.some((arr) => JSON.stringify(arr) === JSON.stringify(variation))
      ) {
        console.log("IS SAME");
        generate();
      } else setState([...state, variation]);
    }
  };

  useEffect(() => {
    generate();
  }, []);

  console.log("STATE", state);
  const Card = ({ factors }: { factors: IQuestion["factors"] }) => {
    const filteredFactors = factors?.filter((f) => f !== null);
    if (filteredFactors === undefined) {
      return <></>;
    }

    return (
      <Box
        border="1px solid #E5E5E5"
        borderRadius="5px"
        mt="30px"
        w="40%"
        _hover={{ border: "1px solid black" }}
      >
        <Button onClick={() => generate()}>generate</Button>
        {filteredFactors.map((factor, idx) => {
          const _t = state[state.length - 1][idx];

          if (!factor.modalities) {
            return <></>;
          }

          return (
            <Box key={uuidv4()}>
              <Text variant="currentBold" textTransform="uppercase" mt="10px">
                {factor?.title}
              </Text>

              <Text>{_t}</Text>
              <Text variant="xs">{factor?.modalities[_t]?.description}</Text>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <Box>
      <FormLabel>{label}</FormLabel>
      {!isCollapsed && (
        <>
          <Box d="flex" justifyContent="space-around" w="100%">
            <Card factors={factors} />
          </Box>
          <Text fontSize="xs">{helpText}</Text>
        </>
      )}
    </Box>
  );
};
