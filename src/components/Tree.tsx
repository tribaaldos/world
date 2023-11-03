import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { useState, useEffect } from 'react';
import * as React from 'react';

type treeType = {
    position: { x: number, z: number };
    box: number;
};

type Props = {
    boundary: number;
    count: number;
};

// const treeModel = useLoader(GLTFLoader, "/static/models/tree.glb");
// const dracoLoader = new DRACOLoader()
// dracoLoader.setDecoderPath('/static/draco/')
const Tree: React.FC<Props> = ({ boundary, count }) => {
    const [trees, setTrees] = useState<treeType[]>([]);
    const [treeModel, setTreeModel] = useState<any>(null);

    useEffect(() => {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/static/draco/');
        const gltfLoader = new GLTFLoader();
        gltfLoader.setDRACOLoader(dracoLoader);

        gltfLoader.load('/static/models/basicTree.glb', (gltf) => {
            setTreeModel(gltf);

            gltf.scene.traverse((object: any) => {
                if (object.isMesh) {
                    object.castShadow = true;
                }
            });
        });
    }, []);




    const boxIntersect = (
        minAx: number, minAz: number, maxAx: number, maxAz: number,
        minBx: number, minBz: number, maxBx: number, maxBz: number
    ) => {
        let aLeftOfB = maxAx < minBx;
        let aRightOfB = minAx > maxBx;
        let aAboveB = minAz > maxBz;
        let aBelowB = maxAz < minBz;
        return !(aLeftOfB || aRightOfB || aAboveB || aBelowB);
    }
    const isOverlapping = (
        index: number,
        tree: any,
        trees: any[]) => {
        // console.log(tree.position)
        const minTargetX = tree.position.x - tree.box / 2;
        const maxTargetX = tree.position.x + tree.box / 2;
        const minTargetZ = tree.position.z - tree.box / 2;
        const maxTargetZ = tree.position.z + tree.box / 2;
        for (let i = 0; i < index; i++) {
            let minChildX = trees[i].position.x - trees[i].box / 2;
            let maxChildX = trees[i].position.x + trees[i].box / 2;
            let minChildZ = trees[i].position.z - trees[i].box / 2;
            let maxChildZ = trees[i].position.z + trees[i].box / 2;
            if (
                boxIntersect(
                    minTargetX, minTargetZ, maxTargetX, maxTargetZ,
                    minChildX, minChildZ, maxChildX, maxChildZ
                )
            ) {
                // console.log("content box overlapping!", tree.position);
                return true;
            }
        }
        return false;
    };

    const newPosition = (box: number, boundary: number) => {
        return (
            boundary / 2 -
            box / 2 -
            (boundary - box) * (Math.round(Math.random() * 100) / 100)
        )
    }
    const updatePosition = (treeArray: treeType[], boundary: number) => {
        treeArray.forEach((tree, index) => {
            do {

                tree.position.x = newPosition(tree.box, boundary)
                tree.position.z = newPosition(tree.box, boundary)
            } while (isOverlapping(index, tree, treeArray))
        })

        setTrees(treeArray);
    };

    useEffect(() => {
        const tempTrees: treeType[] = [];
        for (let i = 0; i < count; i++) {
            tempTrees.push({ position: { x: 0, z: 0 }, box: 1 });
        }
        // console.log(tempTrees);
        updatePosition(tempTrees, boundary);
    }, [boundary, count]);

    return (
        <group rotation={[0, 4, 0]}>
            {trees.map((tree, index) => (
                <object3D key={index} position={[tree.position.x, 0, tree.position.z]}>
                    {/* <primitive object={treeModel.scene.clone()} /> */}
                    {treeModel && treeModel.scene && <primitive object={treeModel.scene.clone()} />}

                </object3D>
            ))}
        </group>
    );
};

export default Tree;
