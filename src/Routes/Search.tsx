import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FetchSearchResults } from "../api";
import { SearchSlider } from "../Components/SearchSlider";




function Search (){
    const location = useLocation();
    const navigate = useNavigate();
    const [text, setText] = useState("");

    const keyword = new URLSearchParams(location.search).get("keyword");
    const { data: MovieData, isLoading: MovingLoading } = useQuery(["SearchData", keyword, "movie"], () => FetchSearchResults(keyword, "movie"));
    const Loading = MovingLoading;


    
    // 인풋 체인지
    const handleChangeText = (e) => {
        setText(e.target.value)
    }

    // 폼 검색 후
    const onValid = (e) => {
        e.preventDefault();
        navigate(`/search?keyword=${text}`);
        setText("");
    };




    
    
    return (
        <>
            {keyword === null ? (
                <NotSearchWrap>
                    <span>아무런 검색을 하지 않았습니다.</span>
                    <SearchBox onSubmit={onValid}>
                        <Input
                            value={text}
                            onChange={handleChangeText}                            
                            transition= {{type: "linear"}}
                            placeholder="영화나 TV쇼를 검색해보세요..."
                            autoComplete='off' />
                    </SearchBox>
                </NotSearchWrap>
            ) : (
                <>
                {Loading ? (
                    <div>
                        Loading...
                    </div>
                ) : (
                    <SearchWrap>
                        <SearchTitle>
                            <span>{keyword}</span>
                            (을)를 검색한 결과입니다.
                        </SearchTitle>

                        <SearchSlider data={MovieData} keyword={keyword}/>
                    </SearchWrap>
                )}
                </>
            )}
        </>
    );
}

const NotSearchWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100vh;
    width: 100%;
    background:#000;
    span {
        font-size: 50px;
        font-weight: 800;
        color:#fff;
    }
`;


const SearchBox = styled.form`
    color: white;
    svg {
        height: 25px;
    };
    display: flex;
    align-items: center;
    position: relative;
`;

const Input = styled(motion.input)`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 500px;
    margin-top: 30px;
    padding: 10px 10px;
    color: white;
    background-color: transparent;
    border: 1px solid ${props => props.theme.white.lighter};
`;

const SearchWrap = styled.div`
    width: 100%;
    min-height: 100vh;
    padding-bottom: 100px;
    background-color: #000;;
`;

const SearchTitle = styled.h2`
    display: flex;
    font-size: 40px;
    padding: 120px 60px 70px;
    text-align: center;
    color:#fff;
    span {
        color: ${props => props.theme.red};
    }
    @media (max-width: 700px) {
        font-size: 25px;
    }
`;



export default Search;