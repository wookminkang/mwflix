import { AnimatePresence, motion, useScroll, useTransform, useViewportScroll } from "framer-motion";
import { off } from "process";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, getPopularMovies, getTopratedMovies, IGetMoviesResult } from "../api"
import { makeImagePath, types } from "../utils";
import useWindowDimensions  from "../useWidowDimensions"
import { useLocation, useMatch, useNavigate, useParams } from "react-router-dom";
import Slider from "../Components/Slider";




function Home (){
    //const width = useWindowDimensions();
    const history = useNavigate();
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);    
    const [back, setBack] = useState(false);



    const {isLoading:nowLoading, data:nowMovies} = useQuery<IGetMoviesResult>(["movies","지금 상영 중인 영화"],getMovies);
    const {isLoading:popularLoading, data:popularMovies} = useQuery<IGetMoviesResult>(["movies","지금 인기 있는 영화"],getPopularMovies);
    const {isLoading:topratedLoading, data:topratedMovies} = useQuery<IGetMoviesResult>(["movies","평가가 좋은 영화"],getTopratedMovies);
    

    const { scrollY } = useScroll();
    const bgOpacity = useTransform(
      scrollY,
      [0, 360],
      [1, 0.25]
    );

  const titleOpacity = useTransform(scrollY, [0, 360], [1, 0]);
	const overviewOpacity = useTransform(scrollY, [0, 360], [0.85, 0]);


    return (
        <Wrapper>
            <Banner
              bgPhoto={makeImagePath(
                nowMovies?.results[0].backdrop_path ||
                nowMovies?.results[0].poster_path ||
                  ""
              )}
            >
              <Title style={{ opacity : titleOpacity }}>
                {nowMovies?.results[0].title}
              </Title>
              <Overview style={{ opacity : overviewOpacity }}>
                {nowMovies?.results[0].overview}
              </Overview>
            </Banner>
            

            <SliderWrap>
              <Slider type={types.now} data={nowMovies}></Slider>
              <Slider type={types.popular} data={popularMovies}></Slider>
              <Slider type={types.top} data={topratedMovies}></Slider>
            </SliderWrap>
            

        </Wrapper>
    )
}

const SliderWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 45px;
  padding-bottom: 100px;
  margin-top:90vh;
`;

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	background-color: black;
`;

const Banner = styled(motion.div)<{ bgPhoto: string }>`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding-inline: 8vw;
	gap: 1.5rem;
	background-image: linear-gradient(
			rgba(0, 0, 0, 0.75),
			rgba(0, 0, 0, 0.25),
			rgba(0, 0, 0, 0.75),
			rgba(0, 0, 0, 1)
		),
		url(${(props) => props.bgPhoto});
	background-size: cover;
	background-position: center;
	pointer-events: none;
	& > * {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		text-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.2);
		pointer-events: auto;
	}
  &::before{
    
  }
`;


const Title = styled(motion.h2)`
	font-size: 4rem;
	-webkit-line-clamp: 1;
	font-weight: bold;
	width: 55vw;
  color:#fff;
  @media screen and (max-width:640px) {
    width:100%;
    font-size: 1.5rem;
  }
`;

const Overview = styled(motion.p)`
	font-size: 1.25rem;
	line-height: 1.5;
	-webkit-line-clamp: 4;
	width: 40vw;
	word-break: keep-all;
	opacity: 0.85;
  color:#fff;
  @media screen and (max-width:640px) {
    width: 100%;
    font-size: 1.05rem;
  }
`;



export default Home;