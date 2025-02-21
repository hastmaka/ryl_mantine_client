import {Anchor, Breadcrumbs, Stack} from '@mantine/core'
import EzText from "@/ezMantine/text/EzText.jsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export default function BlogTitle() {
    const params = useParams();
    const [items, setItems] = useState([
        { title: 'Blog', href: '/blog' }
    ]);

    useEffect(() => {
        if (Object.keys(params).length > 0) {
            const is = items.find(i => i.title === params.title);
            if (!is) {
                setItems(prev => ([ ...prev, {href: '', title: params.title }]));
            }

        }
    }, [params]);

    return (
        <Stack p='2rem 0'>
            <EzText fw='xxl' size='1.5rem'>BLOG</EzText>
            <Breadcrumbs>
                {items.map((item, index) => (
                    // Only render the Anchor if it's not the last item
                    index !== items.length - 1 ? (
                        <EzText
                            component={Anchor}
                            key={index}
                            c='dark'
                            onClick={() => navigate(item.href)}
                        >
                            {item.title}
                        </EzText>
                    ) : (
                        // Render the title without the Anchor if it's the last item
                        <EzText key={index} c='dark'>{item.title}</EzText>
                    )
                ))}
            </Breadcrumbs>
        </Stack>
    );

}