import {
  Heading,
  Text,
  VStack,
  useColorModeValue,
  Box,
  Grid,
  HStack,
  Icon,
  IconProps,
  Button,
} from "@chakra-ui/react";
import { motion, useAnimation, useInView, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Create motion-enabled components for animation
const MotionVStack = motion(VStack);
const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionHStack = motion(HStack);

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

// Grouped technical skills for the new Tab layout
const skillGroups = [
  {
    category: "Verification Methodologies & Techniques",
    skills: [
      "Functional Coverage Modeling",
      "Constrained Random Verification (CRV)",
      "SystemVerilog Assertions (SVA)",
      "Testplan Creation & Traceability",
      "Waveform Debugging & Root Cause Analysis",
      "Regression Strategy & Management",
      "Assertion-Based Verification (ABV)",
      "Scoreboarding & Reference Modeling",
      "UVM-based Testbench Architecture",
    ],
  },

  {
    category: "Tools, Simulators & Environments",
    skills: [
      "Mentor QuestaSim / ModelSim",
      "Synopsys VCS",
      "Xilinx Vivado",
      "GTKwave, Verdi, DVE",
      "JIRA, Confluence",
      "RISC-V SPIKE, SAIL, QEMU",
      "Makefile, Shell Scripting",
      "Git / GitLab",
    ],
  },

  {
    category: "Protocols, Buses & Standards",
    skills: [
      "AMBA AXI4 / AHB / APB",
      "AMBA ACE 5-Lite",
      "LTI/DTI-ATS Coherency Extensions",
      "I2C / SPI / UART",
      "RISC-V Privileged ISA",
      "PCIe (Gen3/4) Familiarity",
      "Interrupt & MSI Handling",
    ],
  },
];

// A simple checkmark icon for the list
const CheckIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
    />
  </Icon>
);

export default function WakatimeSummary() {
  const iconColor = useColorModeValue("teal.500", "cyan.400");
  const hoverBg = useColorModeValue("gray.100", "gray.700");
  const [activeTab, setActiveTab] = useState(0);

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
      pb="4rem"
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
          My proficiency in core verification languages
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
        pt="2rem"
      >
        <Heading as="h2" size="xl" variant="subPrimary">Technical Skills</Heading>
        <Text variant="descriptor" fontSize={{ base: "lg", md: "xl" }}>
          A broader look at my capabilities in the verification domain
        </Text>
      </MotionVStack>

      {/* EDITED: Replaced the Accordion with an interactive Tab layout */}
      <MotionVStack variants={itemVariants} align="center" justify="center" w="full">
        <VStack align="stretch" width="full" maxW="4xl" spacing={5}>
          {/* Tab Buttons */}
          <HStack spacing={4} borderBottom="2px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>
            {skillGroups.map((group, index) => (
              <Button
                key={group.category}
                variant="ghost"
                onClick={() => setActiveTab(index)}
                isActive={activeTab === index}
                position="relative"
                color={activeTab === index ? iconColor : "inherit"}
                _active={{ bg: "transparent" }}
                _after={{
                  content: '""',
                  position: 'absolute',
                  bottom: '-2px',
                  left: 0,
                  right: 0,
                  height: '2px',
                  bg: iconColor,
                  transform: activeTab === index ? 'scaleX(1)' : 'scaleX(0)',
                  transition: 'transform 0.3s ease-in-out',
                }}
              >
                {group.category}
              </Button>
            ))}
          </HStack>

          {/* Tab Content */}
          <Box p={4} minH="200px">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Grid
                  templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                  gap={4}
                >
                  {skillGroups[activeTab].skills.map((skill) => (
                    <MotionHStack
                      key={skill}
                      p={3}
                      spacing={4}
                      whileHover={{
                        backgroundColor: hoverBg,
                        scale: 1.02,
                        x: 5,
                      }}
                      borderRadius="md"
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                      <CheckIcon color={iconColor} w={5} h={5} flexShrink={0} />
                      <Text fontWeight="medium">{skill}</Text>
                    </MotionHStack>
                  ))}
                </Grid>
              </motion.div>
            </AnimatePresence>
          </Box>
        </VStack>
      </MotionVStack>
    </MotionVStack>
  );
}
