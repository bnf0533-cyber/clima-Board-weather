def atbash(text: str) -> str:
    heb = "אבגדהוזחטיכלמנסעפצקרשתךםןץף"
    heb_rev = "תשרקצפעסנמלכיטחזוהדגבאץףןםך"
    
    eng_lower = "abcdefghijklmnopqrstuvwxyz"
    eng_lower_rev = "zyxwvutsrqponmlkjihgfedcba"
    
    eng_upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    eng_upper_rev = "ZYXWVUTSRQPONMLKJIHGFEDCBA"
    
    source = heb + eng_lower + eng_upper
    target = heb_rev + eng_lower_rev + eng_upper_rev
    table = str.maketrans(source, target)
    
    return text.translate(table)