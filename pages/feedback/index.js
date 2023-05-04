import React, { Fragment, useState } from 'react'
import { buildFeedbackPath, extractFeedback } from '../api/feedback'
import Link from 'next/link';

const Feedbackpage = (props) => {
    const [feedbackData, setFeedbackData] = useState();

    function loadFeedbackHandler(id) {
        fetch(`/api/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setFeedbackData(data.feedback)
                console.log("feedbackData: ", feedbackData)
            })
    }

  return (
    <Fragment>
        {feedbackData && <p>{feedbackData.email}</p>}
        <ul className='list-disc py-4'>
            {props.feedbackItems.map((item) => (
                <li key={item.id}>
                    {item.text}{' '}
                    <button className='border-4 p-1 rounded-md' onClick={loadFeedbackHandler.bind(null, item.id)}>
                        Show Details
                    </button>
            {/* <hr/> */}
                </li>
            ))}
        </ul>
        <hr />
        <Link href='/'>
            <button className='border-4 p-2 rounded-xl bg-slate-400'>
                Go Back Home
            </button>
        </Link>
    </Fragment>
  )
}

export async function getStaticProps() {
// you should not use fetch to talk to your own API in getStaticProps
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath)
    return {
        props: {
                feedbackItems: data,
        },
    };
}

export default Feedbackpage