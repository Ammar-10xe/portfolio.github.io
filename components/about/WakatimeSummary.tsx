import {
  Heading,
  Text,
  VStack,
  useColorModeValue,
  Box,
  Grid,
  HStack,
  Wrap,
  WrapItem,
  Tag,
} from "@chakra-ui/react";
import { motion, useAnimation, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

// Create motion-enabled components for animation
const MotionVStack = motion(VStack);
const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionTag = motion(Tag);

// Type interface for the component's props
interface SkillBarProps {
  skill: string;
  level: number;
}

// A new, more interactive component for the skill progress bar
const SkillBar = ({ skill, level }: SkillBarProps) => {
  const barColor = useColorModeValue("teal.500", "cyan.400");
  const bgColor = useColorModeValue("gray.200", "gray.700");
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  // Spring animation for the percentage number
  const animatedLevel = useSpring(0, { stiffness: 100, damping: 30 });
  const roundedLevel = useTransform(animatedLevel, (latest) => Math.round(latest));

  // This effect triggers all animations when the component scrolls into view
  useEffect(() => {
    if (isInView) {
      controls.start({
        width: `${level}%`,
        transition: { type: "spring", stiffness: 50, damping: 20 },
      });
      animatedLevel.set(level);
    }
  }, [isInView, controls, level, animatedLevel]);

  // This function handles the click event to re-run the animations
  const handleClick = async () => {
    // Reset animations
    await controls.start({ width: "0%", transition: { duration: 0.3 } });
    animatedLevel.set(0);

    // Start animations again
    controls.start({
      width: `${level}%`,
      transition: { type: "spring", stiffness: 50, damping: 20 },
    });
    animatedLevel.set(level);
  };

  return (
    <MotionVStack 
      ref={ref}
      align="flex-start" 
      w="full" 
      spacing={1} 
      onClick={handleClick}
      cursor="pointer"
      p={3}
      borderRadius="lg"
      transition={{ duration: 0.2 }}
      whileHover={{ 
        scale: 1.03,
        backgroundColor: useColorModeValue("gray.100", "gray.700"),
      }}
      whileTap={{ scale: 0.98 }}
    >
      <HStack w="full" justify="space-between">
        <Text fontWeight="medium">{skill}</Text>
        <HStack>
          <MotionText color="gray.500" fontSize="sm" fontWeight="bold">
            {roundedLevel}
          </MotionText>
          <Text color="gray.500" fontSize="sm">%</Text>
        </HStack>
      </HStack>
      <Box w="full" h="8px" bg={bgColor} borderRadius="full" overflow="hidden">
        <MotionBox
          h="8px"
          bg={barColor}
          borderRadius="full"
          initial={{ width: 0 }}
          animate={controls}
        />
      </Box>
    </MotionVStack>
  );
};

// Skills with assigned expertise levels for the progress bars
const languageSkills = [
  { name: "SystemVerilog", level: 95 },
  { name: "UVM", level: 90 },
  { name: "C / Python", level: 85 },
  { name: "Assembly", level: 80 },
];

// Other technical skills from your resume for the tag box
const technicalSkills = [
  "Functional Coverage",
  "Constrained Random Testing",
  "IP/SoC Verification",
  "Testbench Architecture",
  "RTL Design",
  "Debugging",
  "Regression Testing",
  "DV Methodologies",
];

export default function WakatimeSummary() {
  const tagColor = useColorModeValue("gray", "gray");

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
    <MotionVStack
      width="full"
      align="stretch"
      spacing={{ base: "3rem", md: "4rem" }}
      pb="4rem" // EDITED: Changed from py="4rem" to remove top padding
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* ===== SECTION 1: Programming Languages ===== */}
      <MotionVStack
        variants={itemVariants}
        spacing={{ base: "1rem", md: "1.5rem" }}
        align="flex-start"
        width="full"
      >
        <Heading as="h2" size="xl" variant="subPrimary">Programming Languages</Heading>
        <Text variant="descriptor" fontSize={{ base: "lg", md: "xl" }}>
          My proficiency in core verification languages.
        </Text>
      </MotionVStack>
      <MotionVStack variants={containerVariants} spacing={4} width="full" align="center">
        <Grid 
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} 
          gap={{ base: 4, md: 6 }}
          width="full"
          maxW="4xl"
        >
          {languageSkills.map((skillItem) => (
            <MotionBox key={skillItem.name} variants={itemVariants}>
              <SkillBar skill={skillItem.name} level={skillItem.level} />
            </MotionBox>
          ))}
        </Grid>
      </MotionVStack>

      {/* ===== SECTION 2: Technical Skills & Methodologies ===== */}
      <MotionVStack
        variants={itemVariants}
        spacing={{ base: "1rem", md: "1.5rem" }}
        align="flex-start"
        width="full"
        pt="2rem" // Add some space above the new section
      >
        <Heading as="h2" size="xl" variant="subPrimary">Technical Skills</Heading>
        <Text variant="descriptor" fontSize={{ base: "lg", md: "xl" }}>
          A broader look at my capabilities in the verification domain.
        </Text>
      </MotionVStack>
      <MotionBox variants={itemVariants} p={6} borderWidth="1px" borderRadius="xl">
        <Wrap spacing="15px" justify="center">
          {technicalSkills.map((skill) => (
            <WrapItem key={skill}>
              <MotionTag
                size="lg"
                variant="solid"
                colorScheme={tagColor}
                whileHover={{ scale: 1.1 }}
              >
                {skill}
              </MotionTag>
            </WrapItem>
          ))}
        </Wrap>
      </MotionBox>
    </MotionVStack>
  );
}
