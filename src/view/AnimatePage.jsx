import {AnimatePresence, motion} from "framer-motion";
import PropTypes from "prop-types";

export default function AnimatePage({component}) {
    return (
        <AnimatePresence>
            {component.map((Com, i) => {
                const Component = Com
                return (
                    <motion.div
                        initial={{
                            opacity: 0,
                            filter: 'blur(2px)'
                        }}
                        transition={{
                            duration: .5,
                            delay: .2
                        }}
                        whileInView={{
                            opacity: 1,
                            filter: 'blur(0px)'
                        }}
                        viewport={{once: true}}
                        key={i}
                    >
                        <Component/>
                    </motion.div>
                )
            })}
        </AnimatePresence>
    )
}

AnimatePage.propTypes = {
    component: PropTypes.array.isRequired
}