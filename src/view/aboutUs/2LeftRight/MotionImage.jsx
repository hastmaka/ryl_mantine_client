import {motion, useMotionValue, useSpring, useTransform} from "framer-motion";
import {Image} from "@mantine/core";
import classes from "../AboutUs.module.scss";
import PropTypes from "prop-types";

const MImage = motion.create(Image);

export default function MotionImage({imgPath, alt, odd}) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(
        mouseYSpring,
        [-0.5, 0.5],
        ['17.5deg', '-17.5deg']
    )

    const rotateY = useTransform(
        mouseXSpring,
        [-0.5, 0.5],
        ['-17.5deg', '17.5deg']
    )

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);

    }

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    }

    return (
        <MImage
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{rotateX, rotateY,transformStyle: 'preserve-3d'}}
            src={imgPath}
            alt={alt}
            className={`${odd ? classes.image : classes['image-odd']}`}
        />
    )
}

MotionImage.propTypes = {
    imgPath: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    odd: PropTypes.bool.isRequired
}