import {
  Heading,
  Text,
  VStack,
  Stack,
  Wrap,
  WrapItem,
  Tag,
  useColorModeValue,
  Box,
  Divider,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

// Create motion-enabled components for animation
const MotionStack = motion(Stack);
const MotionVStack = motion(VStack);
const MotionWrap = motion(Wrap);
const MotionTag = motion(Tag);
const MotionBox = motion(Box);

// Group skills into categories for a more organized presentation
const skillGroups = [
  {
    title: "Languages & Methodologies",
    skills: ["SystemVerilog", "UVM", "C/Python", "SV Assertions"],
  },
  {
    title: "Architectures & Protocols",
    skills: ["RISC-V", "AMBA (AXI, AHB, APB)"],
  },
  {
    title: "Tools & Platforms",
    skills: ["QuestaSim / VCS", "Git / GitLab", "JIRA", "Verdi"],
  },
];

export default function WakatimeSummary() {
  const tagColor = useColorModeValue("teal", "cyan");
  const gradientColor = useColorModeValue("teal.500", "cyan.500");
  const headingColor = useColorModeValue("gray.600", "gray.400");

  // Animation variants for the main container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
      alignItems="flex-start" // Align items to the top
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
      >
        <Heading as="h2" size="xl" variant="subPrimary">Languages & Tools 🛠️</Heading>
        <Divider borderColor={gradientColor} width="50px" borderWidth="2px" />
        <Text
          variant="descriptor"
          fontSize={{ base: "lg", md: "xl" }}
          maxW="lg"
        >
          I specialize in verification using a modern toolset. Here are some of the key technologies I work with, organized by category.
        </Text>
      </MotionVStack>

      {/* ===== Right Column: Grouped Skills ===== */}
      <MotionVStack
        variants={itemVariants}
        flex="1.5"
        spacing={8}
        align="flex-start"
        width="full"
      >
        {skillGroups.map((group) => (
          <MotionVStack key={group.title} align="flex-start" width="full" variants={itemVariants}>
            <Heading as="h3" size="md" color={headingColor}>
              {group.title}
            </Heading>
            <MotionWrap spacing="10px">
              {group.skills.map((skill) => (
                <WrapItem key={skill}>
                  <MotionTag 
                    size="lg" 
                    variant="solid" 
                    colorScheme={tagColor}
                    whileHover={{ scale: 1.1, y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {skill}
                  </MotionTag>
                </WrapItem>
              ))}
            </MotionWrap>
          </MotionVStack>
        ))}
      </MotionVStack>
    </MotionStack>
  );
}
