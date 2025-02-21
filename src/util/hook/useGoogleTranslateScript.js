import { useEffect } from 'react';

function useGoogleTranslateScript() {
    useEffect(() => {
        const addScript = document.createElement('script');
        addScript.setAttribute(
            'src',
            '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
        );
        addScript.setAttribute('id', 'google-translate-script');

        //make sure only one script is loaded
        const googleScript = document.getElementById('google-translate-script');
        if(!googleScript) {
            document.body.appendChild(addScript);
        }
        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: 'en',
                    includedLanguages: 'en,es',
                },
                'google_translate_element'
            );
        };
    }, []);

}

export default useGoogleTranslateScript;
