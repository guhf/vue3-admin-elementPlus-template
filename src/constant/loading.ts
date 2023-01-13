// Loader1
export const svg1 = `
                <circle fill="none" stroke="currentColor" stroke-width="6" stroke-miterlimit="15" stroke-dasharray="14.2472,14.2472" cx="50" cy="50" r="47">
                  <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="5s" from="0 50 50" to="360 50 50" repeatCount="indefinite"></animateTransform>
                </circle>
                <circle fill="none" stroke="currentColor" stroke-width="1" stroke-miterlimit="10" stroke-dasharray="10,10" cx="50" cy="50" r="39">
                    <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="5s" from="0 50 50" to="-360 50 50" repeatCount="indefinite"></animateTransform>
                </circle>
                <g fill="currentColor">
                <rect x="30" y="35" width="5" height="30">
                  <animateTransform attributeName="transform" dur="1s" type="translate" values="0 5 ; 0 -5; 0 5" repeatCount="indefinite" begin="0.1"></animateTransform>
                </rect>
                <rect x="40" y="35" width="5" height="30">
                  <animateTransform attributeName="transform" dur="1s" type="translate" values="0 5 ; 0 -5; 0 5" repeatCount="indefinite" begin="0.2"></animateTransform>
                </rect>
                <rect x="50" y="35" width="5" height="30">
                  <animateTransform attributeName="transform" dur="1s" type="translate" values="0 5 ; 0 -5; 0 5" repeatCount="indefinite" begin="0.3"></animateTransform>
                </rect>
                <rect x="60" y="35" width="5" height="30">
                  <animateTransform attributeName="transform" dur="1s" type="translate" values="0 5 ; 0 -5; 0 5" repeatCount="indefinite" begin="0.4"></animateTransform>
                </rect>
                <rect x="70" y="35" width="5" height="30">
                  <animateTransform attributeName="transform" dur="1s" type="translate" values="0 5 ; 0 -5; 0 5" repeatCount="indefinite" begin="0.5"></animateTransform>
                </rect>
                </g>`

// Loader 2
export const svg2 = `
                <circle fill="none" stroke="currentColor" stroke-width="8" stroke-miterlimit="10" cx="50" cy="50" r="46"></circle>
                <line fill="none" stroke-linecap="round" stroke="currentColor" stroke-width="8" stroke-miterlimit="10" x1="50" y1="50" x2="82" y2="50.5">
                  <animateTransform attributeName="transform" dur="2s" type="rotate" from="0 50 50" to="360 50 50" repeatCount="indefinite"></animateTransform>
                </line>
                <line fill="none" stroke-linecap="round" stroke="currentColor" stroke-width="8" stroke-miterlimit="10" x1="50" y1="50" x2="49.5" y2="74">
                  <animateTransform attributeName="transform" dur="15s" type="rotate" from="0 50 50" to="360 50 50" repeatCount="indefinite"></animateTransform>
                </line>`

// Loader 3
export const svg3 = `
                <circle fill="none" stroke="currentColor" stroke-width="4" cx="50" cy="50" r="44" style="opacity:0.5;"></circle>
                  <circle fill="currentColor" stroke="#e74c3c" stroke-width="3" cx="8" cy="54" r="6">
                    <animateTransform attributeName="transform" dur="2s" type="rotate" from="0 50 48" to="360 50 52" repeatCount="indefinite"></animateTransform>
                </circle>`

// Loader 4
export const svg4 = `
                <circle fill="currentColor" stroke="none" cx="6" cy="50" r="6">
                  <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1"></animate>    
                </circle>
                <circle fill="currentColor" stroke="none" cx="26" cy="50" r="6">
                  <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2"></animate>       
                </circle>
                <circle fill="currentColor" stroke="none" cx="46" cy="50" r="6">
                  <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3"></animate>     
                </circle>`

// Loader 5
export const svg5 = `
                <circle fill="currentColor" stroke="none" cx="6" cy="50" r="6">
                  <animateTransform attributeName="transform" dur="1s" type="translate" values="0 15 ; 0 -15; 0 15" repeatCount="indefinite" begin="0.1"></animateTransform>
                </circle>
                <circle fill="currentColor" stroke="none" cx="30" cy="50" r="6">
                  <animateTransform attributeName="transform" dur="1s" type="translate" values="0 10 ; 0 -10; 0 10" repeatCount="indefinite" begin="0.2"></animateTransform>
                </circle>
                <circle fill="currentColor" stroke="none" cx="54" cy="50" r="6">
                  <animateTransform attributeName="transform" dur="1s" type="translate" values="0 5 ; 0 -5; 0 5" repeatCount="indefinite" begin="0.3"></animateTransform>
                </circle>`

// Loader 6
export const svg6 = `
                <rect fill="none" stroke="currentColor" stroke-width="4" x="25" y="25" width="50" height="50">
                <animateTransform attributeName="transform" dur="0.5s" from="0 50 50" to="180 50 50" type="rotate" id="strokeBox" attributeType="XML" begin="rectBox.end"></animateTransform>
                </rect>
                <rect x="27" y="27" fill="currentColor" width="46" height="50">
                <animate attributeName="height" dur="1.3s" attributeType="XML" from="50" to="0" id="rectBox" fill="freeze" begin="0s;strokeBox.end"></animate>
                </rect>`

// Loader 7
export const svg7 = `
                <path fill="currentColor" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3
                  c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z">
                      <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="2s" from="0 50 50" to="360 50 50" repeatCount="indefinite"></animateTransform>
                  </path>
                <path fill="currentColor" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7
                  c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z">
                      <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="-360 50 50" repeatCount="indefinite"></animateTransform>
                  </path>
                <path fill="currentColor" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5
                  L82,35.7z">
                      <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="2s" from="0 50 50" to="360 50 50" repeatCount="indefinite"></animateTransform>
                  </path>`

// Loader 8
export const svg8 = `
                <rect fill="currentColor" width="3" height="100" transform="translate(0) rotate(180 3 50)">
                  <animate attributeName="height" attributeType="XML" dur="1s" values="30; 100; 30" repeatCount="indefinite"></animate>
                </rect>
                <rect x="17" fill="currentColor" width="3" height="100" transform="translate(0) rotate(180 20 50)">
                  <animate attributeName="height" attributeType="XML" dur="1s" values="30; 100; 30" repeatCount="indefinite" begin="0.1s"></animate>
                </rect>
                <rect x="40" fill="currentColor" width="3" height="100" transform="translate(0) rotate(180 40 50)">
                  <animate attributeName="height" attributeType="XML" dur="1s" values="30; 100; 30" repeatCount="indefinite" begin="0.3s"></animate>
                </rect>
                <rect x="60" fill="currentColor" width="3" height="100" transform="translate(0) rotate(180 58 50)">
                  <animate attributeName="height" attributeType="XML" dur="1s" values="30; 100; 30" repeatCount="indefinite" begin="0.5s"></animate>
                </rect>
                <rect x="80" fill="currentColor" width="3" height="100" transform="translate(0) rotate(180 76 50)">
                  <animate attributeName="height" attributeType="XML" dur="1s" values="30; 100; 30" repeatCount="indefinite" begin="0.1s"></animate>
                </rect>`

// Loader 9 
export const svg9 = `
                <rect x="20" y="50" width="4" height="10" fill="currentColor">
                  <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0" dur="0.6s" repeatCount="indefinite"></animateTransform>
                </rect>
                <rect x="30" y="50" width="4" height="10" fill="currentColor">
                  <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.2s" dur="0.6s" repeatCount="indefinite"></animateTransform>
                </rect>
                <rect x="40" y="50" width="4" height="10" fill="currentColor">
                  <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.4s" dur="0.6s" repeatCount="indefinite"></animateTransform>
                </rect>`

// Loader 10
export const svg10 = `
                  <path fill="currentColor" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                    <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite"></animateTransform>
                  </path>`