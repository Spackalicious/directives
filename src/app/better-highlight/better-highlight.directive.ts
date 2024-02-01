import { Directive
    , Renderer2 // there is also RendererV2 but when I tried to import it like the video said, VSC complained!
    , OnInit
    , ElementRef
    , HostListener
    , HostBinding 
    , Input
} from "@angular/core";

@Directive({
    selector: '[appBetterHighlight]'
})

export class BetterHighlightDirective implements OnInit {
    @Input() defaultColor: string = 'transparent';
    @Input('appBetterHighlight') highlightColor: string = 'blue';
    // @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent'; //another way to do this  
    // @HostBinding('style.backgroundColor') backgroundColor: string = this.defaultColor;  
    // ^^this makes the initial background color transparent, but we want it to be yellow now as per the html. So moving stuff to ngOnInit again.
    @HostBinding('style.backgroundColor') backgroundColor: string;  

    // trying this out on my own to make the highlight text color white
    @Input() defaultTextColor: string = 'black';
    @Input() highlightTextColor: string = 'white';
    @HostBinding('style.color') color: string = this.defaultTextColor;

    constructor (
        private elRef: ElementRef, private renderer: Renderer2
    ) {
        
    }

    ngOnInit() {
        // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
        // after 'blue', you can set optional flags. you can use ! to show important, which overrides other styles.

        // moved the this.render... code to @HostListener to be more interactive

        // now, using html to set background highlight to yellow instead of the initial transparent like hte Hostbinding.
        this.backgroundColor = this.defaultColor;
    }

    @HostListener('mouseenter') mouseover(eventData: Event) {
        // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
        // ^^we no longer need this because we're using @HostBinding above instead.

        // this.backgroundColor = 'blue';
        // now using Input to assign the color!

        this.backgroundColor = this.highlightColor;
        this.color = 'white';
    }

    @HostListener('mouseleave') mouseleave(eventData: Event) {
        // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
        // no longer needed, just like mouseneter above, because of @HostBinding

        // this.backgroundColor = 'transparent';
        // now using Input to assign the color! 

        this.backgroundColor = this.defaultColor;
        this.color = this.defaultTextColor;
    }
}