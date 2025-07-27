import {
  Heading,
  Text,
  VStack,
  Stack,
  useColorModeValue,
  Box,
  Divider,
  Grid,
  HStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

// Create motion-enabled components for animation
const MotionStack = motion(Stack);
const MotionVStack = motion(VStack);
const MotionBox = motion(Box);

// CORRECTED: Added a type interface for the component's props
interface SkillBarProps {
  skill: string;
  level: number;
}

// A new component for the skill progress bar
const SkillBar = ({ skill, level }: SkillBarProps) => {
  const barColor = useColorModeValue("teal.500", "cyan.400");
  const bgColor = useColorModeValue("gray.200", "gray.700");

  const barVariants = {
    hidden: { width: 0 },
    show: { 
      width: `${level}%`,
      transition: { duration: 1, ease: "easeOut" }
    },
  };

  return (
    <VStack align="flex-start" w="full" spacing={1}>
      <HStack w="full" justify="space-between">
        <Text fontWeight="medium">{skill}</Text>
        <Text color="gray.500" fontSize="sm">{level}%</Text>
      </HStack>
      <Box w="full" h="6px" bg={bgColor} borderRadius="full" overflow="hidden">
        <MotionBox
          h="6px"
          bg={barColor}
          borderRadius="full"
          variants={barVariants}
        />
      </Box>
    </VStack>
  );
};

// Skills with assigned expertise levels
const skillsWithExpertise = [
  { name: "SystemVerilog", level: 95 },
  { name: "UVM", level: 90 },
  { name: "RISC-V", level: 90 },
  { name: "Assembly", level: 80 },
  { name: "C / Python", level: 85 },
  { name: "AMBA Protocols", level: 85 },
  { name: "SV Assertions", level: 80 },
  { name: "QuestaSim / VCS", level: 80 },
  { name: "Git / GitLab", level: 75 },
];

export default function WakatimeSummary() {
  const gradientColor = useColorModeValue("teal.500", "cyan.500");

  // Animation variants for the main container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Animation for individual items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <MotionStack
      width="full"
      direction={{ base: "column", lg: "row" }}
      alignItems="center"
      justifyContent="center"
      spacing={{ base: "3rem", lg: "5rem" }}
      py="4rem"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* ===== Left Column: Text Content ===== */}
      <MotionVStack
        variants={itemVariants}
        spacing={{ base: "1rem", md: "1.5rem" }}
        align={{ base: "center", lg: "flex-start" }}
        textAlign={{ base: "center", lg: "left" }}
        flex="1"
        maxW="lg"
      >
        <Heading as="h2" size="xl" variant="subPrimary">Languages & Tools 🛠️</Heading>
        <Divider borderColor={gradientColor} width="50px" borderWidth="2px" />
        <Text
          variant="descriptor"
          fontSize={{ base: "lg", md: "xl" }}
        >
          I have a strong command of the essential languages, methodologies, and tools required for modern design verification.
        </Text>
      </MotionVStack>

      {/* ===== Right Column: Skill Bars ===== */}
      <MotionVStack
        variants={containerVariants} // Use container variants to stagger the children
        flex="1.5"
        spacing={6}
        width="full"
      >
        <Grid 
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} 
          gap={{ base: 6, md: 8 }}
          width="full"
        >
          {skillsWithExpertise.map((skillItem) => (
            <MotionBox key={skillItem.name} variants={itemVariants}>
              <SkillBar skill={skillItem.name} level={skillItem.level} />
            </MotionBox>
          ))}
        </Grid>
      </MotionVStack>
    </MotionStack>
  );
}
