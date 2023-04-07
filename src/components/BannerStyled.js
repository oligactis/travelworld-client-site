import styled from "styled-components";

const BannerBG = styled.section`
    position: relative;
    overflow: hidden;
    width: 100%;
    min-height: calc(100vh - 64px);
    background: url(${props => props.img}) center/cover fixed no-repeat;
`;

export default BannerBG;