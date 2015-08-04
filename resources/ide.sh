#!/bin/sh

cd workspace
nsl2vl DE2_115.nsl
quartus_sh -t ../resources/mkproj-DE2_115.tcl -project DE2_115 DE2_115.v
quartus_sh --flow compile DE2_115
quartus_pgm -c "USB-Blaster" -m JTAG -o"p;DE2_115.sof"