import {Grid} from "@mantine/core";
import {UseCasesCardData} from "../../../static/UseCasesCardData.js";
import UseCasesCard from "./UseCasesCard.jsx";

export default function UseCasesGrid() {
    return (
        <Grid pt={{base: '2rem', md: '4rem'}}>
            {UseCasesCardData.map((item, index) =>
                <Grid.Col key={index} span={{ base: 12, md: 6 }} style={{display: 'flex'}}>
                    <UseCasesCard item={item}/>
                </Grid.Col>
            )}
        </Grid>
    )
}
