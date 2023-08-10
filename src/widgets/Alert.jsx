import PropTypes from 'prop-types'

export default function Alert(props) {
    return (
        <>
            {props.alert &&
                <div id="alertDiv" tabIndex="-1" className={`border ${(props.alert.success)?"text-green-400 border-gray-600 ":"text-red-600 border-red-600 "} mt-16 fixed z-50 flex flex-row justify-between w-[calc(100%-2rem)] p-4 -translate-x-1/2 text-sm bg-gray-800 rounded-lg  shadow-sm lg:max-w-7xl left-1/2 top-6`}>
                    <div className="flex flex-row items-start md:items-center md:flex-row md:mb-0">
                        <p className="pl-2 md:pl-0 flex self-center items-center font-semibold text-center w-full">{props.alert.message}</p>
                    </div>
                    <button data-dismiss-target="#alertDiv" type="button" className="relative left-0 flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close banner</span>
                    </button>
                </div>
            }
        </>
    )
}

Alert.propTypes = {
    alert:PropTypes.shape({
        success: PropTypes.bool,
        message: PropTypes.string,
    }),
}
