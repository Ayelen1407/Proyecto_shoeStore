import React from "react";
import "./talle.css";

export default function Talles() {
  return (
    <div className="talles-container">
      <h2 className="talle-h2">Guia de Talles</h2>

      <table className="tabla-talles">
        <thead>
          <tr>
            <th>talle</th>
            <th>arg</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>1</td><td>34</td></tr>
          <tr><td>2</td><td>35</td></tr>
          <tr><td>3</td><td>36</td></tr>
          <tr><td>4</td><td>37</td></tr>
          <tr><td>5</td><td>38</td></tr>
          <tr><td>6</td><td>39</td></tr>
          <tr><td>7</td><td>40</td></tr>
          <tr><td>8</td><td>41</td></tr>
          <tr><td>9</td><td>42</td></tr>
          <tr><td>10</td><td>43</td></tr>
          <tr><td>11</td><td>44</td></tr>
          <tr><td>12</td><td>45</td></tr>

        </tbody>
      </table>
    </div>
  );
}