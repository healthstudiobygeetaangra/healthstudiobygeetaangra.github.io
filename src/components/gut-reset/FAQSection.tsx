import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faq } from "@/data/gutResetWebinar";
import { cardClassName, fadeInUp } from "./shared";

const FAQSection = () => {
  return (
    <motion.section {...fadeInUp} className={cardClassName}>
      <h2 className="font-serif text-3xl text-[#2F2B28]">FAQ</h2>
      <Accordion type="single" collapsible className="mt-4 space-y-2">
        {faq.map((item, index) => (
          <AccordionItem
            key={item.question}
            value={`faq-${index}`}
            className="rounded-2xl border border-[#E7E1D8] bg-[#FCFBF8] px-4"
          >
            <AccordionTrigger className="py-3 text-left text-sm font-semibold text-[#2F2B28] hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="pb-3 text-sm text-[#5F5851]">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.section>
  );
};

export default FAQSection;
