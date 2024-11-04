import * as motion from "framer-motion/client";
export default function page() {
  return (
    <div>
      {/* Framer-Motion SSR로 불러올때 */}
      <motion.p
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        page
      </motion.p>
    </div>
  );
}
