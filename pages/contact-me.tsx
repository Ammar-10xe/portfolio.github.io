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

// Keyframe animation for gradient flow
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
        spacing={12}
        align="center"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <MotionHeading
          size={{ base: "2xl", md: "3xl", lg: "4xl" }}
          textAlign="center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
        >
          Let&apos;s Connect Together
        </MotionHeading>

        <MotionText
          fontSize={{ base: "lg", md: "xl" }}
          color={textColor}
          textAlign="center"
          maxW="3xl"
        >
          I&apos;m actively seeking impactful roles as a{" "}
          <Text as="span" fontWeight="bold">
            Functional Verification Engineer
          </Text>
          . Whether you have a challenging project, a career opportunity, or
          just want to discuss the future of tech, I&apos;m eager to connect.
        </MotionText>

        <MotionVStack
          spacing={6}
          align="center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* Phone CTA */}
          <ContactCTA
            href="tel:+923054059832"
            label="+92 305 4059832"
            gradient={gradient}
            animation={gradientFlowAnimation}
          />

          {/* Email CTA */}
          <ContactCTA
            href="mailto:ammark561@gmail.com"
            label="ammark561@gmail.com"
            gradient={gradient}
            animation={gradientFlowAnimation}
          />
        </MotionVStack>
      </MotionVStack>
    </Container>
  );
}

function ContactCTA({
  href,
  label,
  gradient,
  animation,
}: {
  href: string;
  label: string;
  gradient: string;
  animation: string;
}) {
  return (
    <HStack>
      <Button
        as={LinkBox}
        variant="unstyled"
        padding="0"
        _hover={{ transform: "scale(1.05)" }}
        _active={{ transform: "scale(0.95)" }}
      >
        <MotionHeading
          as="h3"
          fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
          fontWeight="extrabold"
          bg={gradient}
          bgClip="text"
          bgSize="300% 100%"
          bgPosition="right"
          textColor="transparent"
          animation={animation}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.3 }}
        >
          <LinkOverlay href={href}>{label}</LinkOverlay>
        </MotionHeading>
      </Button>
    </HStack>
  );
}
