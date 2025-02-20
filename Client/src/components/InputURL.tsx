import { useState } from "react";
import { useShortLink } from "../hooks/useShortLink";

const InputURL = () => {
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");

    const mutation = useShortLink();
    const handleSubmit = () => {
        if (!url.trim()) return console.log("Enter text");
        mutation.mutate(url, {
            onSuccess: (data) => {
                setShortUrl(data);
            },
            onError: () => {
                console.log("Error");
            },
        });
    };
    return <div>
        <input type="text" value={url} onChange={(e)=>setUrl(e.target.value)} />
        <button onClick={handleSubmit}>Create</button>
        
        {shortUrl && (
           <div>
            <a href={shortUrl}>{shortUrl}</a>
           </div> 
        )}
    </div>;
};

export default InputURL;
