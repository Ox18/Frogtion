(function(window, document){
    //
        var CONSTS = {
            STATUS_FRAME: {
                NORMAL: "NORMAL",
                HOVER: "HOVER",
                CLICKED: "CLICKED",
                DISABLED: "DISABLED"
            },
            ANIMATION: {
                SPEED_NORMAL: 20,
            }
        };

        class Frogtity{
            constructor(){
                this.frames = {};
                this.rows = 0;
                this.columns = 0;
                this.totalCount = 0;
                this.element = null;
                this.widthPerFrame = 0;
                this.heightPerFrame = 0;
            }
        
            static init(){
                return new Frogtity();
            }
            
            setWidthPerFrame(
                width
            ){
                this.widthPerFrame = width;
                return this;
            }
        
            setHeightPerFrame(
                height
            ){
                this.heightPerFrame = height;
                return this;
            }
        
            setRows(
                rows
            ){
                this.rows = rows;
                return this;
            }
        
            setColumns(
                columns
            ){
                this.columns = columns;
                return this;
            }
        
            setTotalCount(
                totalCount
            ){
                this.totalCount = totalCount;
                return this;
            }
        
            setFrames(
                frames
            ){
                this.frames = frames;
                return this;
            }
        
            setTitle(
                title
            ){
                this.title = title;
                return this;
            }

            setTooltip(
                tooltip
            ){
                this.tooltip = tooltip;
                return this;
            }

            addElement(
                tag
            ){
                this.element = document.querySelector(tag);
                return this;
            }
        
            addFrame(
                frame
            ){
                this.frames = {...this.frames, ...frame};
            }
        
            getRow(){
                return this.rows;
            }
        
            getColumn(){
                return this.columns;
            }
        
            getTotalCount(){
                return this.totalCount;
            }
        
            getElement(){
                return this.element;
            }
        
            getFrames(){
                return this.frames;
            }
        
            getFramesByName(name){
                return this.frames[name];
            }
        
            getWidthPerFrame(){
                return this.widthPerFrame;
            }
        
            getHeightPerFrame(){
                return this.heightPerFrame;
            }

            getTitle(){
                return this.title;
            }

            getTooltip(){
                return this.tooltip;
            }
        };
        
        class Frogtion{
            constructor(){
                this.disabled = false;
                this.frogtity = null;
                this.interval = null;
                this.pointer = 0;
                this.framesSelected = {
                    start: 0,
                    end: 0
                };
                this.frameName = CONSTS.STATUS_FRAME.NORMAL;
                this.SPEED_DEFAULT = CONSTS.ANIMATION.SPEED_NORMAL;
                this.tooltip = null;
                this.title = null;
            }
        
            static init(){
                return new Frogtion();
            }
        
            setFrogtity(
                frogtity
            ){
                this.frogtity = frogtity;
                return this;
            }

            addFrameNormal(
                props
            ){
                this.addFrame({ name: CONSTS.STATUS_FRAME.NORMAL, ...props});
                return this;
            }

            addFrameHover(
                props
            ){
                this.addFrame({ name: CONSTS.STATUS_FRAME.HOVER, ...props});
                return this;
            }

            addFrameClicked(
                props
            ){
                this.addFrame({ name: CONSTS.STATUS_FRAME.CLICKED, ...props});
                return this;
            }
            
            addFrameDisabled(
                props
            ){
                this.addFrame({ name: CONSTS.STATUS_FRAME.DISABLED, ...props});
                return this;
            }
        
            addFrame({ 
                name,
                startFrame, 
                endFrame, 
                endLoopChangeTo = CONSTS.STATUS_FRAME.NORMAL,
                loop = true
            }){

                this.frogtity.addFrame({ [name]: {
                    start: startFrame,
                    end: endFrame,
                    endLoopChangeTo,
                    loop
                }});
                return this;
            }
        
            run(){
                this.addEvents();
                this.interval = setInterval(() => this.nextFrame() , this.getSecondsToChange());
                this.onRun();
                return this;
            }

            onRun(){
                this.changeAnimateTo(CONSTS.STATUS_FRAME.NORMAL);
                this.addContainer();
                this.addTooltip();
                this.addTitle();
            }

            addContainer(){
                const element = document.createElement("div");
                element.classList.add("frogtity-container");
                this.frogtity.getElement().appendChild(element);
                element.style.cssText = `
                width: 100%;
                height: 100%;
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content:flex-end;
                align-items: center;
                `;
            }

            addTitle(){
                if(!this.frogtity.getTitle()) return;
                const element = document.createElement("div");
                element.innerHTML = this.frogtity.getTitle();
                element.classList.add("frogtity-title");
                this.frogtity.getElement().children[0].appendChild(element);
                this.title = element;
                this.title.style.cssText = `
                text-shadow: -1px 0 2px black, 0 1px 2px black, 1px 0 2px black, 0 -1px 2px black;
                color: white;
                font: inherit;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                font-weight: 600;
                font-size: 11px;
                height: 100%;
                user-select: none;
                padding-top: 60%;`
            }

            addTooltip(){
                if(!this.frogtity.getTooltip()) return;
                const element = document.createElement("div");
                element.innerHTML = this.frogtity.getTooltip();
                element.classList.add("frogtity-tooltip");
                this.frogtity.getElement().children[0].appendChild(element);
                this.tooltip = element;
                this.tooltip.style.cssText = `
                background-color: #f0efcf;
                font: inherit;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                font-size: 10px;
                max-width: 100px;
                min-width: 100px;
                color: #7a785f;
                padding: 5px;
                border: 1px solid #7a785f;
                text-align: center;
                display: none;`;
            }
        
            getSecondsToChange(){
                return this.frogtity.getTotalCount() / this.frogtity.getColumn() * this.SPEED_DEFAULT;
            }
        
            nextFrame(){
                this.increasePointer();
                if(this.pointerIsFinal()){
                    if(!this.framesSelected.loop) this.changeFramesTo(this.framesSelected.endLoopChangeTo);
                    this.resetPointer();
                }
                this.setFrame(this.pointer);
            }
        
            increasePointer(){
                this.pointer++;
            }
        
            pointerIsFinal(){
                return this.pointer + 1 > this.framesSelected.end;
            }
        
            setFrame(
                pointer
            ){
                const x = pointer % this.frogtity.getColumn() * this.frogtity.getWidthPerFrame();
                const y = Math.floor(pointer / this.frogtity.getColumn()) * this.frogtity.getHeightPerFrame();
                this.frogtity.getElement().style.backgroundPosition = `-${x}px -${y}px`;
            }
        
            addEvents(){
                this.frogtity.element.addEventListener("mouseover", this.onHover.bind(this));
                this.frogtity.element.addEventListener("click", this.onClick.bind(this));
                this.frogtity.element.addEventListener("mouseout", this.onMouseOut.bind(this));
            }
        
            onHover(){
                this.changeToFrameHover();
            }
        
            onClick(){
                this.changeToFrameClicked();
            }
        
            onMouseOut(){
                this.changeToFrameNormal();
            }
        
            onDisable(){
                this.disabled = true;
                this.changeToFrameDisabled();
                this.resetPointer();
            }

            onEnable(){
                this.disabled = false;
                this.changeToFrameNormal();
                this.resetPointer();
            }
        
            changeSpeed(
                speed
            ){
                this.SPEED_DEFAULT = speed;
                return this;
            }
        
            changeToFrameNormal(){
                this.changeFramesTo(CONSTS.STATUS_FRAME.NORMAL);
            }
        
            changeToFrameHover(){
                this.changeFramesTo(CONSTS.STATUS_FRAME.HOVER);
            }
        
            changeToFrameClicked(){
                this.changeFramesTo(CONSTS.STATUS_FRAME.CLICKED);
            }
            
            changeToFrameDisabled(){
                this.changeFramesTo(CONSTS.STATUS_FRAME.DISABLED);
            }
        
            changeFramesTo(
                name
            ){
                if(name !== CONSTS.STATUS_FRAME.DISABLED && this.disabled) return;
                if(this.frogtity.getFrames()[name] && this.frameName !== name) this.changeAnimateTo(name);

                if(this.tooltip){
                    if(name === CONSTS.STATUS_FRAME.HOVER){
                        this.tooltip.style.display = "block";
                    }else{
                        this.tooltip.style.display = "none";
                    }
                }
            }

            changeAnimateTo(
                name
            ){
                this.framesSelected = this.frogtity.getFrames()[name];
                this.frameName = name;
                this.resetPointer();
                
            }
        
            resetPointer(){
                this.pointer = this.framesSelected.start;
            }
        };

        if(typeof window.CONSTS === "undefined") window.CONSTS = CONSTS;
        if(typeof window.Frogtity === "undefined") window.Frogtity = Frogtity;
        if(typeof window.Frogtion === "undefined") window.Frogtion = Frogtion;
})(window, document);