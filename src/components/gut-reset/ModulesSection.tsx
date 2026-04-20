import { motion } from "framer-motion";
import { modules } from "@/data/gutResetWebinar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cardClassName, fadeInUp } from "./shared";

const ModulesSection = () => {
  return (
    <motion.section {...fadeInUp} className={cardClassName}>
      <h2 className="font-serif text-3xl text-[#2F2B28]">Program Modules</h2>
      <Accordion type="single" collapsible className="mt-4 space-y-3">
        {modules.map((module, index) => (
          <AccordionItem
            key={module.title}
            value={`module-${index}`}
            className="rounded-2xl border border-[#E7E1D8] bg-[#FCFBF8] px-4"
          >
            <AccordionTrigger className="py-4 text-left text-sm font-semibold text-[#2F2B28] hover:no-underline">
              {module.title}
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-sm text-[#5F5851]">
              {module.description}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.section>
  );
};

export default ModulesSection;
