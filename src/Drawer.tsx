import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useDragControls,
  Variants,
} from "framer-motion";

interface BottomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const Drawer: React.FC<BottomDrawerProps> = ({ isOpen, onClose }) => {
  const [drawerHeight] = useState("70vh"); // Height of the drawer
  const dragControls = useDragControls();

  // Animation variants for the drawer
  const drawerVariants: Variants = {
    open: { y: 0 },
    closed: { y: "100%" },
  };

  // Animation variants for the overlay
  const overlayVariants: Variants = {
    open: { opacity: 1, pointerEvents: "auto" as const },
    closed: { opacity: 0, pointerEvents: "none" as const },
  };

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={onClose}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 999,
            }}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        exit="closed"
        variants={drawerVariants}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.5,
        }}
        drag="y" // Enable vertical drag
        dragConstraints={{ top: 0, bottom: 0 }} // Constrain drag to vertical axis
        dragElastic={{ top: 0, bottom: 0.5 }} // Add elastic effect when dragging down
        dragControls={dragControls}
        onDragEnd={(event, info) => {
          if (info.offset.y > 100 || info.velocity.y > 500) {
            // Swipe down to close (based on offset or velocity)
            onClose();
          }
        }}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          height: drawerHeight,
          backgroundColor: "#fff",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
          boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
          zIndex: 1000,
          overflow: "hidden",
        }}
      >
        {/* Drag handle */}
        <div
          style={{
            width: "100%",
            padding: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "grab",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "4px",
              backgroundColor: "#ccc",
              borderRadius: "2px",
            }}
          />
        </div>

        {/* Drawer content */}
        <div style={{ padding: "20px" }}>
          <h2>Bottom Drawer</h2>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </div>
      </motion.div>
    </>
  );
};

export default Drawer;
