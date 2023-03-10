import {useState,useEffect,Fragment} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { BsFillStarFill } from 'react-icons/bs'
import { BsHeartFill } from 'react-icons/bs';
import { BsFillEyeFill } from 'react-icons/bs';
import { fontSize } from '@mui/system';
import axios from 'axios';
import RecipeCreate from './RecipeCreate';
import { useParams } from 'react-router-dom';


export default function Tumbnail() {

    const [regId, setRegId] = useState([]);
    const [title, setTitle] = useState('');
    const [stitle, setStitle] = useState('');
    const [content, setContent] = useState([]);
    const [mat, setMat] = useState([]);
    const [source, setSource] = useState([]);
    const [imageUrl, setImageUrl] = useState('');

    const [ratingValue, setRatingValue] = useState(0);

    const {rNo} = useParams();
    

    useEffect(()=> {
        axios.get(`/rcpref/${rNo}`)
        .then((response) => {
            const rcp = response.data;
            console.log(response.data);
            console.log(rcp.sTitle)
            setRegId(rcp.regId)
            setTitle(rcp.title)
            setStitle(rcp.stitle)
            setContent(rcp.content)
            setMat(rcp.mat)
            setSource(rcp.source)
            setImageUrl('/img/' + rcp.thumbPath);
            console.log(title);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])
    
    useEffect(()=> {
        axios.get(`/ratingvalue/${rNo}`)
        .then((response)=> {
            const view = response.data;
            console.log(response.data);

            const sumRate = view.reduce(function add(sum,currValue){
                return sum + currValue;
            },0);
            // console.log(sumRate);
            const avgRate = sumRate/view.length;
            // console.log(avgRate);
            setRatingValue(avgRate);

        })
        .catch((error)=> {
            console.log(error);
        })
    },[])

    return (
        <div style={{ width: '1080px' }}>
            <div style={{ float: 'left', width: '540px' }}>
                <Fragment>
                    <Container fixed id='thumb_container'>
                        {/* ????????? ?????????????????? ???*/}
                        <img
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            src={imageUrl} alt='?????? ????????? ????????????' />
                    </Container>
                </Fragment>
            </div>
            <div style={{ float: 'right', width: '540px' }}>
                <Fragment>
                    <Container fixed id='detail_container'>
                        <div id='icons_group'>
                            {/* ?????????, ??????, ????????? ???????????? ??? */}
                            <span><BsFillEyeFill />&nbsp;0</span>&nbsp;&nbsp;
                            <span><BsFillStarFill />&nbsp;{ratingValue}</span>&nbsp;&nbsp;
                            <span><BsHeartFill />&nbsp;17</span>&nbsp;&nbsp;
                        </div><hr />
                        <div id='explain_recipe'>
                            <div id='exp_title'>
                            <h2 style={{ fontSize: '30px' }}>
                                {/* ????????? ????????? ???????????? ??? */}
                                
                                <span style={{color:'blue'}}>
                                    '{regId}'
                                    </span> ?????? 
                            </h2>
                                <h2 style={{ fontSize: '30px' }}>
                                    {title}
                                    {/* ?????? ????????? ?????? */}
                                </h2>
                            </div>
                            <div id='exp_text'>
                                <p style={{ fontSize: '14px' }}>
                                    {/* ?????? ?????? ?????? ?????? ??? ?????? */}
                                    {stitle}
                                    {/* ????????? ????????? ??? ??? ???????????? ???????????? ?????????! <br />
                                    ????????? ?????? ????????? ?????? ??????<br />
                                    ???????????? ????????? ????????? ????????? ?????????<br />
                                    ?????? ????????? ????????? ?????????????! */}
                                </p>
                            </div><hr />
                        </div>
                        <div id='explain_mat'>
                            <p style={{ fontSize: '24px' }}>
                                
                                <strong>??????</strong>
                                </p>
                            <div id='exp_mat'>
                                <h3 style={{ fontSize: '16px' }}><strong>????????????</strong></h3>
                                <p style={{ fontSize: '12px' }}>
                                    {/* ???????????? */}
                                    {mat}
                                </p>
                            </div>
                            <div id='exp_source'>
                                <h3 style={{ fontSize: '16px' }}><strong>??????</strong></h3>
                                <p style={{ fontSize: '12px' }}>
                                   {source}
                                </p>
                            </div>

                        </div>

                    </Container>
                </Fragment>
            </div><hr/>
        </div>
    )
} 