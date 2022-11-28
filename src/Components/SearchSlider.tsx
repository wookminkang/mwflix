import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { IGetMoviesResult, IGetDetailMovie, FetchMovieDetail, FetchMovieVideo } from '../api';
import { useNavigate, useLocation } from 'react-router-dom';
import { makeImagePath } from '../utils';
import { FaRegWindowClose } from 'react-icons/fa';
import { useQuery } from 'react-query';
import ReactPlayer from 'react-player'


export function SearchSlider({data, keyword}) {
    console.log(data);
    const navigate = useNavigate();
    const location = useLocation();
    const movieId = new URLSearchParams(location.search).get("movieId");


    const clickedMovie = data?.results.find(item => item.id + "" === movieId);

    const { data: clickedMovieDetail } = useQuery<IGetDetailMovie>([movieId, "searchDetailMovie"]
        , () => FetchMovieDetail(+movieId!));
    
    const { data: clicekdMovieVideo } = useQuery(["searchDetailVideo", movieId], () => FetchMovieVideo(+movieId))

    console.log(clicekdMovieVideo);
    

    
    return (
        <>
        <SliderWrap>
            <Row variants={rowVariants} initial="hidden" animate="end" >
                {data.results.map(item => (
                    <Box bgphoto={item.backdrop_path || item.poster_path !== null
                        ? makeImagePath(item.backdrop_path || item.poster_path, "w500")
                        : "https://ang-projects.com/public/uploads/contents/testi-no-image.png"}
                        variants={boxVariants}
                        whileHover="hover"
                        key={item.id}
                        layoutId={item.id + ""}
                    >
                        <Info onClick={() => navigate(`/search?keyword=${keyword}&movieId=${item.id}`)}>
                            <Title>{item.title}</Title>
                        </Info>
                    </Box>
                ))
                }
            </Row>
        </SliderWrap>
        <AnimatePresence>
            {movieId ? (
                <>
                    <Overlay
                        exit={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => { 
                                navigate(`/search?keyword=${keyword}`);
                            }
                        }
                    />
                    {
                        clickedMovie && (
                            <BigTvShow 
                                layoutId={movieId} 
                                bgPhoto={makeImagePath(clickedMovie?.backdrop_path || clickedMovie?.poster_path || "")} 
                            >
                                <BigTvCover bgPhoto={makeImagePath(clickedMovie?.poster_path || "")} />
                                <BigTvContent>
                                    <BigTvOverview>
                                        <div>
                                            <h1>{clickedMovie.title}</h1>
                                            <h3>{clickedMovie.overview}</h3>
                                            <span style={{ color: "#72d19d" }}>Geners</span>
                                            {clickedMovieDetail?.genres.map(item => (
                                                <span>{item.name}</span>
                                            ))}
                                        </div>
                                        <ReactPlayer
                                            url={`https://www.youtube.com/embed/${clicekdMovieVideo?.results[0]?.key}?showinfo=0&enablejsapi=1&origin=http://localhost:3000`}
                                            width={`100%`}
                                            height={'320px'}
                                            volume={0.3}
                                            playing={true}
                                            loop={true}
                                            style={{pointerEvents: 'none'}}
                                        >
                                        </ReactPlayer>
                                    </BigTvOverview>
                                </BigTvContent>
                            </BigTvShow>
                        )
                    }
                </>
            ) : null }
        </AnimatePresence>
        </>
    );
}






const rowVariants = {

    hidden: {
        scale: 1
    },
    end: {
        transition: {
            duration: 1,
            delayChildren: 0.5,
            staggerChildren: 0.15,
            scale: 1
        }
    }
};

const boxVariants = {
    normal: {
        scale: 1,
    },
    hover: {
        scale: 1.1,
        transition: {
            duration: 0.3,
            type: "tween"
        }
    },
    
}


const BigTvOverview = styled.div`
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    gap: 15px;
`;


const BigTvContent = styled.div`
    color: ${props => props.theme.white.lighter};
    text-overflow: ellipsis;
    h1 {
        font-size: 50px;
        font-weight: 800;
        text-shadow: -2px 0px #000, 0px 2px #000, 2px 0px #000, 0px -2px #000;
    }
    h3 {
        padding-top: 20px;
        color: ${props => props.theme.white.lighter};
        font-size: 20px;
        font-weight: 400;
        line-height: 1.5;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        margin-bottom: 20px;
    }
    
    span {
        font-size: 20px;
        font-weight: 700;
        margin-right: 15px;
    }
`;


const BigTvCover = styled.div<{ bgPhoto: string }>`
    background-image: url(${props => props.bgPhoto});
    background-position: center center;
    background-size: cover;
    width: 70%;
    height: 100%;
    position: relative;
    top: 0;
    bottom: 0;
    margin: 0 auto;
    border-radius: 15px;
`;



const BigTvShow = styled(motion.div)<{ bgPhoto: string }>`
    position: fixed;
    width: 80vw;
    height: 80vh;
    top: 80px;
    left: 0;
    right: 0;
    margin: 0 auto;
    background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7)), url(${props => props.bgPhoto});
    background-position: center center;
    background-size: cover;
    border-radius: 15px;
    overflow-x: hidden;
    overflow-y: scroll;
    z-index: 101;
    ::-webkit-scrollbar {
        display: none;
    }
    @media (max-width: 800px) {
        width: 90vw;
    }
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding: 50px;
`;





const SliderWrap = styled.div`
    position: relative;
    margin-bottom: 80px;
    top: 0px;
    padding: 0 60px;
`;

const Row = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 35px;
    margin-bottom: 10px;
    width: 100%;
    overflow: hidden;
`

const Box = styled(motion.div)<{bgphoto : string}>`
    background-color: white;
    height: 200px;
    background-size: cover;
    background-position: center center;
    background-image: url(${props => props.bgphoto});
    &:first-child {
        transform-origin: center left;
    }
    &:last-child {
        transform-origin: center right;
    }
    cursor: pointer;
    position: relative;
`

const Info = styled(motion.div)`
    opacity: 1;
    position: relative;
    height: 100%;
    background: rgba(0,0,0,0.3);
`

const Title = styled.h2`
    font-size: 20px;
    font-weight: 800;
    text-align: center;
    position: absolute;
    bottom: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    right: 0;
    left: 0;
    color:#fff;
`

const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    opacity: 0;
    z-index: 3;
`;