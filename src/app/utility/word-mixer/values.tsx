

const source = `nigr	hitam
blaŋk	putih
fraw	kuniŋ
rudy	merah
werd	hidyaw
blu	biru
orandy	dyiŋga
purpur	uŋu
brun	tyoklat
liŋgw	bahasa
patr	bapa`

const rules = `I=m,n,ŋ,b,d,g,p,t,k,f,s,h,y,w,r
WF=m,n,ŋ,b,d,g,p,t,k,f,s,h,r
F=N,p,t,k,f,s,h,y,w,l
M=r,y,w
V=a,e,i,o,u
RM=(<M>,0)<V>(<F>,0)
word=(<I>,0)<RM>(<I><RM>,0)<WF>`

const changes = `y(i|e)	ya
w(u|o)	wa
(i|e)y	ay
(u|o)w	aw
N([mbpf])	m$1
N([ŋkgh])	ŋ$1
N([ndts])	n$1
C=[^aeiou]
V=[aeiou]
(r.*<C>)r	$1
(y.*<C>)y	$1
(w.*<C>)w	$1
wr	ur
wy	uy
yr	ir
yw	iw
N	ŋ
td	d
kg	g
pb	b
([fmpb])w	$1
lr	r
(.)\\1	$1`

const scoring = `m	0	0	1	1
b	0	0	0	1
p	0	0	0	0
f	0	0.2	0	0
n	0.25	0	1	1
d	0.25	0	0	1
r	0.25	0.4	0	1
l	0.25	0.4	0	1
t	0.25	0	0	0
s	0.25	0.2	0	0
y	0.5	0.4	0	1
i	0.5	0.6	0	1
e	0.5	0.8	0	1
a	0.75	1	0	1
ŋ	1	0	1	1
g	1	0	0	1
w	1	0.4	0	1
u	1	0.6	0	1
o	1	0.8	0	1
k	1	0	0	0
h	1	0.2	0	0`

export { source, rules, changes, scoring }