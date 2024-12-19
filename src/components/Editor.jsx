'use client'
import { Editor } from "@tinymce/tinymce-react";

const Tinyeditor = () => {
    const handleEditorChange = (content) => {
        console.log('Content:', content);
    };

    return (
        <Editor
            initialValue="<p>Start writing...</p>"
            init={{
                height: 500,
                menubar: true,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                ],
                toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                     alignleft aligncenter alignright alignjustify | \
                     bullist numlist outdent indent | removeformat | help',
                base_url: '/tinymce', // Path to your tinymce folder in public
                suffix: '.min', // Use the minified version
            }}
            onEditorChange={handleEditorChange}
        />
    );
}

export default Tinyeditor