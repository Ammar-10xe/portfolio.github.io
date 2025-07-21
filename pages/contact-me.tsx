import InterestedPositions from "@/components/contact/InterestedPositions";
import { useAppContext } from "@/context/state";
import { getGradientFlow } from "@/utils/gradient";
import { GRADIENT_FLOW_DURATION } from "@/utils/motion";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
  keyframes,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const shift = keyframes`
  from {
    background-position: 100% 50%;
  }
  to {
    background-position: 0% 50%;
  }
`;
const gradientFlowAnimation = `${shift} ${GRADIENT_FLOW_DURATION} linear infinite`;

// Motion components
const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

export default function ContactMe() {
  const { gradientTheme } = useAppContext();
  const gradient = getGradientFlow(gradientTheme, "to right");
  const textColor = useColorModeValue("gray.700", "gray.200");

  return (
    <Container maxW="6xl" pt={{ base: 16, md: 24 }} pb={32}>
      <MotionVStack
        spacing={10}
        align="start"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Section Heading */}
        <VStack align="start" spacing={4}>
          <MotionHeading
            size="2xl"
            fontWeight="bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Let’s Connect
          </MotionHeading>
          <MotionText
            fontSize={{ base: "md", md: "lg" }}
            color={textColor}
            maxW="xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            I’m actively looking for roles in digital design and verification.
            Feel free to reach out — I’d love to connect!
          </MotionText>
        </VStack>

        {/* Positions List */}
        <Box width="full">
          <InterestedPositions />
        </Box>

        {/* Contact Info */}
        <MotionVStack
          spacing={6}
          align="start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="medium">
            You can reach me at:
          </Text>

          {/* Phone Number */}
        {/* Phone Number Gradient CTA */}
        <HStack>
          <Button
            as={LinkBox}
            padding="0"
            variant="unstyled"
            _hover={{ transform: "scale(1.05)" }}
            _active={{ transform: "scale(0.95)" }}
          >
            <MotionHeading
              bg={gradient}
              bgClip="text"
              bgSize="300% 100%"
              bgPosition="right"
              textColor="transparent"
              animation={gradientFlowAnimation}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
              fontWeight="extrabold"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.3 }}
            >
              <LinkOverlay href="tel:+923054059832">
                +92 305 4059832
              </LinkOverlay>
            </MotionHeading>
          </Button>
        </HStack>


          {/* Email Gradient CTA */}
          <HStack>
            <Button
              as={LinkBox}
              padding="0"
              variant="unstyled"
              _hover={{ transform: "scale(1.05)" }}
              _active={{ transform: "scale(0.95)" }}
            >
              <MotionHeading
                bg={gradient}
                bgClip="text"
                bgSize="300% 100%"
                bgPosition="right"
                textColor="transparent"
                animation={gradientFlowAnimation}
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                fontWeight="extrabold"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.3 }}
              >
                <LinkOverlay href="mailto:ammark561@gmail.com">
                  ammark561@gmail.com
                </LinkOverlay>
              </MotionHeading>
            </Button>
          </HStack>
        </MotionVStack>
      </MotionVStack>
    </Container>
  );
}
