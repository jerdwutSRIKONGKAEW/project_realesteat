

const ArticleAsset = () => {

    const ArticleList = () => {
        return <div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                    <div>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </div>
                    <div>
                        is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
                    </div>
                    <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                    <div className="flex-d">
                        <div>
                            Lorem Ipsum is simply dummy 
                        </div>
                        <div>
                            <div>
                                is simply dummy text 
                            </div>
                            <div>
                                is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                            </div>
                        </div>
                    </div>
               </div>

               <div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            -----------------------------
                        </div>
                        <div>
                            ----------------------------
                        </div>
                    </div>
                    <div>
                        ----------------------------
                    </div>
               </div>
            </div>
        </div>
    }

    return(
        <div>
            <ArticleList  />
        </div>
    )
}

export default ArticleAsset;