import { Box, FormLabel, Text } from "@chakra-ui/react";
import IQuestion from "types/form/question";

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
  const Card = ({ factors }: { factors: IQuestion["factors"] }) => {
    return (
      <Box
        border="1px solid #E5E5E5"
        borderRadius="5px"
        mt="30px"
        w="40%"
        _hover={{ border: "1px solid black" }}
      >
        {factors?.map((factor) => {
          const length = factor?.modalities?.length;
          const r =
            length !== undefined ? Math.floor(Math.random() * length) : 0;

          return (
            <Box key={factor.title}>
              <Text variant="currentBold" textTransform="uppercase" mt="10px">
                {factor?.title}
              </Text>
              <Box borderBottom="1px solid #E5E5E5" py="10px" pl="10px">
                <Box key={factor?.modalities[r]?.description}>
                  {factor?.modalities[r]?.file && (
                    <img
                      src={factor?.modalities[r]?.file}
                      alt={factor?.modalities[r]?.description}
                      style={{ maxWidth: "30px", margin: "0 auto" }}
                    />
                  )}
                  <Text variant="currentLight" textAlign="left">
                    {factor?.modalities[r]?.description}
                  </Text>
                </Box>
              </Box>
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
            <Card factors={factors} />
          </Box>
          <Text fontSize="xs">{helpText}</Text>
        </>
      )}
    </Box>
  );
};
