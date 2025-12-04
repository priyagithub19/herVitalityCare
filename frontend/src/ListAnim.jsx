"use client"

import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import './ListAnim.css'

export default function ExitAnimation() {
    const [isVisible, setIsVisible] = useState(true)

    return (
        <div className="contain">
            <AnimatePresence initial={false}>
                {isVisible ? (
                    <motion.div
                    className="box"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        key="box"
                    />
                ) : null}
            </AnimatePresence>
            <motion.button
            className="button"
                onClick={() => setIsVisible(!isVisible)}
                whileTap={{ y: 1 }}
            >
                {isVisible ? "Hide" : "Show"}
            </motion.button>
        </div>
    )
}



