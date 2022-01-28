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